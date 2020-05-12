package matcher

import (
	"github.com/thechosenoneneo/favor-giver/pkg/db"
)

func NewMatcher(db *db.Database) *Matcher {
	return &Matcher{db}
}

type Matcher struct {
	db     *db.Database
	stopCh chan struct{}
}

func (m *Matcher) Start() {
	go func() {
		for {
			select {
			case m.stopCh:
				return
			default:
			}

		}
	}()
}

func (m *Matcher) Stop() {
	m.stopCh <- struct{}{}
}
