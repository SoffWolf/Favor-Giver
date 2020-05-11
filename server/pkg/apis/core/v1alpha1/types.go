package v1alpha1

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type Metadata struct {
	ID        UID       `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Helper struct {
	Metadata `json:",inline"`

	//HelperSpec   `json:"spec"`
	//HelperStatus `json:"status"`
	Person `json:"person"`

	Expertises  []*Expertise `json:"expertises,omitempty" gorm:"many2many:helpers_expertises;"` // association_foreignkey:id;foreignkey:id;association_jointable_foreignkey:expertise_id;jointable_foreignkey:helper_id
	Tasks       []*Task      `json:"tasks"`                                                     // one-to-many (has many, foreign key HelperID is in Task)
	HelpSession *HelpSession `json:"helpSession,omitempty"`
}

/*type HelperSpec struct {
	Person `json:"person"`
}

type HelperStatus struct {
	//HelpSession *HelpSession `json:"helpSession,omitempty"` // one-to-one (has one, foreign key is in HelpSession)
	//Tasks       []*Task      `json:"tasks"`       // one-to-many (has many, foreign key HelperID is in Task)
}*/

type Seeker struct {
	Metadata `json:",inline"`

	//SeekerSpec   `json:"spec"`
	//SeekerStatus `json:"status"`
	Person `json:"person"`

	Tasks []*Task `json:"tasks"` // one-to-many (has many, foreign key SeekerID is in Task)
}

/*type SeekerSpec struct {
	Person `json:"person"`
}

type SeekerStatus struct {
	//Tasks []*Task `json:"tasks"` // one-to-many (has many, foreign key SeekerID is in Task)
}*/

type Person struct {
	FirstName   string    `json:"firstName"`
	LastName    string    `json:"lastName"`
	BirthDate   time.Time `json:"birthDate"`
	PhoneNumber string    `json:"phoneNumber"` // TODO: Add to sketch
	Biography   string    `json:"biography"`

	Address `json:"address"`
}

type Address struct {
	Address    string `json:"address"`
	PostalCode uint32 `json:"postalCode"`
	City       string `json:"city"`
	Country    string `json:"country"` // code or free-form text?
}

type Location string

type location struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

func (l *Location) UnmarshalJSON(b []byte) error {
	data := location{}
	if err := json.Unmarshal(b, &data); err != nil {
		return err
	}
	*l = Location(fmt.Sprintf("%f,%f", data.Lat, data.Lng))
	return nil
}

func (l Location) MarshalJSON() ([]byte, error) {
	parts := strings.Split(string(l), ",")
	if len(parts) != 2 {
		return nil, fmt.Errorf("invalid location: %s", string(l))
	}
	lat, err := strconv.ParseFloat(parts[0], 64)
	if err != nil {
		return nil, err
	}
	lng, err := strconv.ParseFloat(parts[1], 64)
	if err != nil {
		return nil, err
	}
	return json.Marshal(location{
		Lat: lat,
		Lng: lng,
	})
}

type Task struct {
	Metadata `json:",inline"`

	TaskSpec   `json:"spec"`
	TaskStatus `json:"status"`

	SeekerID UID `json:"seekerID"`
	HelperID UID `json:"helperID"`

	// Populated fields:
	Seeker *Seeker `json:"seeker,omitempty"` // one-to-many
	Helper *Helper `json:"helper,omitempty"` // one-to-many
}

type TaskSpec struct {
	FavorTypeID  FavorTypeID   `json:"favorType"`    // the kind of favor needed (one-to-many, belongs-to)
	StartTime    time.Time     `json:"startTime"`    // from when the favor will be needed. TODO: Add to sketch
	Duration     time.Duration `json:"duration"`     // how long it's expected to take
	Instructions string        `json:"instructions"` // extra information about the request
	// SeekerID       UID           `json:"seekerID"`       // what seeker needs this help, (one-to-many, belongs-to)
	SeekerLocation Location `json:"seekerLocation"` // where the seeker needs this help
	// Attachment for later
}

/*
(Propose seeker/helper match) ->
Helper clicks "Start" (Match) ->
Helper has arrived within 300m radius (Arrive) ->
Helper has helped seeker with the task (Finish)

OR possibly
Seeker cancelled the request (Cancel)

AND/OR possibly
When the Seeker has "accepted" the helper (Accept)
*/

type TaskStatus struct {
	MatchTime  *time.Time `json:"matchTime"`  // what time a "match" was created (i.e. when the helper clicked "Help")
	ArriveTime *time.Time `json:"arriveTime"` // what time the helper arrived to the place
	FinishTime *time.Time `json:"finishTime"` // what time the session ended
	//AcceptTime *time.Time `json:"acceptTime"` // what time

	//HelperID          *UID           `json:"helperID"`          // who's helping?
	TransportDuration *time.Duration `json:"transportDuration"` // what's the expected time of transportation
	HelperLocation    *Location      `json:"helperLocation"`    // what's the start location of the one helping

	//*Review `json:"helperReview"`
}

type Review struct {
	Stars   uint32 `json:"stars"`
	Message string `json:"message"`
}

type HelpSession struct {
	Metadata `json:",inline"`

	StartTime     time.Time     `json:"startTime"`
	StartLocation Location      `json:"startLocation"`
	Duration      time.Duration `json:"duration"`
	FavorTypes    []*FavorType  `json:"favorTypes" gorm:"many2many:helpsessions_favortypes;"`
	HelperID      UID           `json:"helperID"` // one-to-one (belongs to Helper)

	// Populated fields:
	Helper *Helper `json:"helper,omitempty"`
}

type FavorTypeID string // e.g. go shopping, talk, fix computer, fix bike,

type FavorType struct {
	ID               FavorTypeID  `json:"id"`                                                 // used as the name of the task type internally. Must be unique across the data set. E.g. "BuySomething"
	ShortDescription string       `json:"shortDescription"`                                   // a short description of the task, e.g. "Buy something (groceries, medicines, etc.)"
	LongDescription  string       `json:"longDescription"`                                    // a longer description which could be shown if the user presses an information button
	Expertises       []*Expertise `json:"expertises" gorm:"many2many:favortypes_expertises;"` // what expertise the helper must possess in order to do the task (many-many)

	// Populated fields:
	HelpSessions []*HelpSession `json:"helpSessions,omitempty" gorm:"many2many:helpsessions_favortypes;"`
}

type ExpertiseID string // computer, bike, carpenter skills

type Expertise struct {
	ID               ExpertiseID `json:"id"`               // used as the name of the task type internally. Must be unique across the data set. E.g. "BuySomething"
	ShortDescription string      `json:"shortDescription"` // a short description of the task, e.g. "Buy something (groceries, medicines, etc.)"
	LongDescription  string      `json:"longDescription"`  // a longer description which could be shown if the user presses an information button

	// Populated fields:
	FavorTypes []*FavorType `json:"favorTypes,omitempty" gorm:"many2many:favortypes_expertises;"` // preload
	Helpers    []*Helper    `json:"helpers,omitempty" gorm:"many2many:helpers_expertises;"`       // preload // association_foreignkey:id;foreignkey:id;association_jointable_foreignkey:helper_id;jointable_foreignkey:expertise_id"
}

/*type TaskType string

const (
	TaskTypeGoSomewhere  TaskType = "GoSomewhere"  // ride/physical help to appointment, doctor, etc.
	TaskTypeBuySomething TaskType = "BuySomething" // grocery, medicines, etc.
	TaskTypeEasyOnline   TaskType = "EasyOnline"   // online tasks like log in to Kanta, the Bank, do shopping, etc.
	TaskTypeTalk         TaskType = "Talk"         // just hang out :)

)*/

type UID uint64
