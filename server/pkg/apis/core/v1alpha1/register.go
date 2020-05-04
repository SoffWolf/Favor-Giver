package v1alpha1

import (
	"github.com/thechosenoneneo/favor-giver/pkg/db"
	"github.com/thechosenoneneo/favor-giver/pkg/rest"
)

const (
	GroupName = "core.favorgiver.io"
	Version   = "v1alpha1"
)

var (
	resources = []rest.ResourceHandler{
		{
			ResourceName: "helpers",
			InitObject: func() interface{} {
				return &Helper{}
			},
			InitList: func() interface{} {
				return &[]Helper{}
			},
		},
		{
			ResourceName: "seekers",
			InitObject: func() interface{} {
				return &Seeker{}
			},
			InitList: func() interface{} {
				return &[]Seeker{}
			},
		},
		{
			ResourceName: "tasks",
			InitObject: func() interface{} {
				return &Task{}
			},
			InitList: func() interface{} {
				return &[]Task{}
			},
		},
	}
)

func RegisterREST(apiGroups *rest.APIGroupsHandler) error {
	coreAPIGroup, err := apiGroups.Add(GroupName, Version)
	if err != nil {
		return err
	}
	coreAPIGroup.Add(resources...)
	return nil
}

func RegisterDB(db *db.Database) {
	for _, resource := range resources {
		db.DB.AutoMigrate(resource.InitObject())
	}
}
