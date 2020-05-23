package matcher

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/thechosenoneneo/favor-giver/pkg/apis/core/v1alpha1"
	"github.com/thechosenoneneo/favor-giver/pkg/client"
	"github.com/thechosenoneneo/favor-giver/pkg/matcher/location/route"
)

const MaximumKilometerDistance = 10

func NewMatcher(c *client.Client, dc route.DistanceCalculator) *Matcher {
	return &Matcher{c, make(chan struct{}), log.New(os.Stdout, "Matcher", log.LstdFlags), dc}
}

type Matcher struct {
	c      *client.Client
	stopCh chan struct{}
	logger *log.Logger
	dc     route.DistanceCalculator
}

func (m *Matcher) Start() {
	m.logger.Printf("Starting Matcher goroutine...")
	go func() {
		for {
			time.Sleep(15 * time.Second)

			select {
			case <-m.stopCh:
				return
			default:
			}

			if err := m.reconcile(); err != nil {
				m.logger.Printf("reconcile error occured: %v", err)
			}
		}
	}()
}

func (m *Matcher) reconcile() error {
	taskList, err := m.c.Dynamic("tasks").List() // GET /apis/core.favorgiver.io/v1alpha1/tasks
	if err != nil {
		return err
	}
	tasks, ok := taskList.(*[]v1alpha1.Task)
	if !ok || tasks == nil {
		return fmt.Errorf("couldn't convert to []Task")
	}

	helpSessionList, err := m.c.Dynamic("helpsessions").List()
	if err != nil {
		return err
	}
	helpSessions, ok := helpSessionList.(*[]v1alpha1.HelpSession)
	if !ok || helpSessions == nil {
		return fmt.Errorf("couldn't convert to []HelpSession")
	}

	log.Printf("Starting to look for matching tasks and helpsessions")

	for _, task := range *tasks {
		//m.logger.Printf("Task: Seeker: %d, Helper: %v, FavorType: %s", task.SeekerID, task.HelperID, task.FavorTypeID)

		if task.TaskRequest.StartTime.After(time.Now()) {
			log.Printf("task %d is in the future, don't consider now", task.ID)
			continue
		}

		// is this task available for pick-up
		if task.HelperID == nil {
			// we need to find a helper here! check helpsessions
			for _, helpSession := range *helpSessions {
				// verify session is free
				if helpSession.TaskID != nil {
					log.Printf("helpsession %d is already taken...", helpSession.ID)
					continue
				}
				// find a help session that has a matching type
				found := false
				for _, ft := range helpSession.FavorTypes {
					if ft.ID == task.FavorTypeID {
						found = true
						break
					}
				}
				if !found {
					log.Printf("helpSession %d didn't have matching favor types as task %d (%v %v)...", helpSession.ID, task.ID, helpSession.FavorTypes, task.FavorTypeID)
					continue
				}

				// check distance
				resp, err := m.dc.GetDistance(string(task.TaskRequest.SeekerLocation), string(helpSession.StartLocation))
				if err != nil {
					log.Printf("got error from distance calculator: %v", err)
					continue
				}
				if resp.Kilometers > MaximumKilometerDistance {
					log.Printf("helper is too far away: %v", resp)
					continue
				}

				// check that helper has time
				helperEndTime := helpSession.StartTime.UTC().Add(helpSession.Duration.Duration)
				taskEndTime := time.Now().UTC().Add(resp.Time).Add(task.TaskRequest.Duration.Duration)
				if taskEndTime.After(helperEndTime) {
					log.Printf("task %d would take until %s, whereas helpsession %d is only valid %s", task.ID, taskEndTime, helpSession.ID, helperEndTime)
					continue
				}

				log.Printf("HelpSession %d and Task %d matched!!", helpSession.ID, task.ID)
			}
		}
	}
	return nil
}

func (m *Matcher) Stop() {
	m.stopCh <- struct{}{}
}
