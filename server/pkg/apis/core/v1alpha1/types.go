package v1alpha1

import "time"

type Metadata struct {
	ID        uint      `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Helper struct {
	Metadata `json:",inline"`
	Person   `json:",inline"`

	ActiveSession *HelpSession `json:"activeSession"`
}

type Seeker struct {
	Metadata `json:",inline"`
	Person   `json:",inline"`

	//ActiveTask *Task
}

type Person struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	PhoneNumber string `json:"phoneNumber"`
}

type HelpSession struct {
	StartTime     time.Time     `json:"startTime"`
	StartLocation Location      `json:"startLocation"`
	Duration      time.Duration `json:"duration"`
	Categories    []CategoryID  `json:"categories"`

	//ActiveTask *Task
}

type Location struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type Task struct {
	Metadata `json:",inline"`

	Spec   TaskSpec   `json:"spec"`
	Status TaskStatus `json:"status"`
}

type TaskSpec struct {
	StartTime      time.Time     `json:"startTime"`
	Duration       time.Duration `json:"duration"`
	SeekerLocation Location      `json:"seekerLocation"`
	CategoryID     CategoryID    `json:"categoryID"`
	SeekerID       UID           `json:"seekerID"`
}

type TaskStatus struct {
	MatchTime  *time.Time `json:"matchTime"`
	AcceptTime *time.Time `json:"acceptTime"`
	FinishTime *time.Time `json:"finishTime"`

	HelperID          *UID           `json:"helperID"`
	HelperLocation    *Location      `json:"helperLocation"`
	TransportDuration *time.Duration `json:"transportDuration"`

	HelperRating *Rating `json:"helperRating"`
}

type Rating struct {
	Stars uint32 `json:"stars"`
}

type CategoryID string
type UID string
