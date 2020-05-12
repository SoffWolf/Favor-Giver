package v1alpha1

import (
	"time"

	"github.com/thechosenoneneo/favor-giver/pkg/rest/meta"
)

type Metadata struct {
	ID        UID       `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Helper struct {
	*meta.TypeMeta `json:",inline"`
	Metadata       `json:",inline"`

	Person `json:"person"`

	// Populated fields:
	Expertises  []*Expertise `json:"expertises,omitempty" gorm:"many2many:helpers_expertises;"` // association_foreignkey:id;foreignkey:id;association_jointable_foreignkey:expertise_id;jointable_foreignkey:helper_id
	Tasks       []*Task      `json:"tasks"`                                                     // one-to-many (has many, foreign key HelperID is in Task)
	HelpSession *HelpSession `json:"helpSession,omitempty"`
}

type Seeker struct {
	*meta.TypeMeta `json:",inline"`
	Metadata       `json:",inline"`

	Person `json:"person"`

	// Populated fields:
	Tasks []*Task `json:"tasks"` // one-to-many (has many, foreign key SeekerID is in Task)
}

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

type Task struct {
	*meta.TypeMeta `json:",inline"`
	Metadata       `json:",inline"`

	TaskRequest  `json:"request"`
	TaskResponse `json:"response"`

	// what seeker needs this help, (one-to-many, belongs-to)
	SeekerID UID `json:"seekerID"`
	// what kind of favor is needed (one-to-many, belongs-to)
	FavorTypeID FavorTypeID `json:"favorTypeID"`
	// what helper signed up to help (one-to-many, belongs-to)
	HelperID *UID `json:"helperID"`

	// Populated fields:
	Seeker    *Seeker    `json:"seeker,omitempty"`    // one-to-many
	Helper    *Helper    `json:"helper,omitempty"`    // one-to-many
	FavorType *FavorType `json:"favorType,omitempty"` // one-to-many
}

type TaskRequest struct {
	StartTime      time.Time     `json:"startTime"`      // from when the favor will be needed. TODO: Add to sketch
	Duration       time.Duration `json:"duration"`       // how long it's expected to take
	Instructions   string        `json:"instructions"`   // extra information about the request
	SeekerLocation Location      `json:"seekerLocation"` // where the seeker needs this help
	// Attachment for later
}

/*
Seeker says they need help from this time (Start) ->
(Propose seeker/helper match) ->
Helper clicks "Start" (Match) ->
Helper has arrived within 300m radius (Arrive) ->
Helper has helped seeker with the task (Finish)

OR possibly
Seeker cancelled the request (Cancel)

AND/OR possibly
When the Seeker has "accepted" the helper (Accept)
*/

type TaskResponse struct {
	MatchTime  *time.Time `json:"matchTime"`  // what time a "match" was created (i.e. when the helper clicked "Help")
	ArriveTime *time.Time `json:"arriveTime"` // what time the helper arrived to the place
	FinishTime *time.Time `json:"finishTime"` // what time the session ended

	TransportDuration *time.Duration `json:"transportDuration"` // what's the expected time of transportation
	HelperLocation    *Location      `json:"helperLocation"`    // what's the start location of the one helping

	//*Review `json:"helperReview"`
}

type Review struct {
	Stars   uint32 `json:"stars"`
	Message string `json:"message"`
}

type HelpSession struct {
	*meta.TypeMeta `json:",inline"`
	Metadata       `json:",inline"`

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
	*meta.TypeMeta   `json:",inline"`
	ID               FavorTypeID  `json:"id"`                                                 // used as the name of the task type internally. Must be unique across the data set. E.g. "BuySomething"
	ShortDescription string       `json:"shortDescription"`                                   // a short description of the task, e.g. "Buy something (groceries, medicines, etc.)"
	LongDescription  string       `json:"longDescription"`                                    // a longer description which could be shown if the user presses an information button
	Expertises       []*Expertise `json:"expertises" gorm:"many2many:favortypes_expertises;"` // what expertise the helper must possess in order to do the task (many-many)

	// Populated fields:
	HelpSessions []*HelpSession `json:"helpSessions,omitempty" gorm:"many2many:helpsessions_favortypes;"`
	Tasks        []*Task        `json:"tasks,omitempty"`
}

type ExpertiseID string // computer, bike, carpenter skills

type Expertise struct {
	*meta.TypeMeta   `json:",inline"`
	ID               ExpertiseID `json:"id"`               // used as the name of the task type internally. Must be unique across the data set. E.g. "BuySomething"
	ShortDescription string      `json:"shortDescription"` // a short description of the task, e.g. "Buy something (groceries, medicines, etc.)"
	LongDescription  string      `json:"longDescription"`  // a longer description which could be shown if the user presses an information button

	// Populated fields:
	FavorTypes []*FavorType `json:"favorTypes,omitempty" gorm:"many2many:favortypes_expertises;"` // preload
	Helpers    []*Helper    `json:"helpers,omitempty" gorm:"many2many:helpers_expertises;"`       // preload // association_foreignkey:id;foreignkey:id;association_jointable_foreignkey:helper_id;jointable_foreignkey:expertise_id"
}

type UID uint64
