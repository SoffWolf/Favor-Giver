package v1alpha1

import (
	"github.com/labstack/echo"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
	"github.com/thechosenoneneo/favor-giver/pkg/rest/meta"
	registerrest "github.com/thechosenoneneo/favor-giver/pkg/rest/register"
)

const (
	GroupName = "core.favorgiver.io"
	Version   = "v1alpha1"
)

var (
	GroupVersion = meta.GroupVersion{
		GroupName: GroupName,
		Version:   Version,
	}

	resources = []registerrest.Resource{
		registerrest.NewResource(
			"expertises",
			func() interface{} {
				return &Expertise{}
			},
			func() interface{} {
				return &[]Expertise{}
			},
			nil,
			[]string{"FavorTypes", "Helpers"},
		),
		registerrest.NewResource(
			"helpers",
			func() interface{} {
				return &Helper{}
			},
			func() interface{} {
				return &[]Helper{}
			},
			nil,
			[]string{"Expertises", "Tasks", "HelpSession"},
		),
		registerrest.NewResource(
			"seekers",
			func() interface{} {
				return &Seeker{}
			},
			func() interface{} {
				return &[]Seeker{}
			},
			nil,
			[]string{"Tasks"},
		),
		registerrest.NewResource(
			"tasks",
			func() interface{} {
				return &Task{}
			},
			func() interface{} {
				return &[]Task{}
			},
			map[string]echo.HandlerFunc{
				"match": SubResourceTasksMatch,
			},
			[]string{"Helper", "Seeker", "FavorType", "HelpSession"},
		),
		registerrest.NewResource(
			"helpsessions",
			func() interface{} {
				return &HelpSession{}
			},
			func() interface{} {
				return &[]HelpSession{}
			},
			nil,
			[]string{"FavorTypes", "Helper", "Task"},
		),
		registerrest.NewResource(
			"favortypes",
			func() interface{} {
				return &FavorType{}
			},
			func() interface{} {
				return &[]FavorType{}
			},
			nil,
			[]string{"Expertises", "HelpSessions", "Tasks"},
		),
	}
)

func RegisterREST(apiGroups registerrest.APIGroupsHandler) error {
	coreAPIGroup, err := apiGroups.Add(GroupName, Version)
	if err != nil {
		return err
	}
	coreAPIGroup.Add(resources...)
	return nil
}

func RegisterDB(db *db.Database) {
	for _, resource := range resources {
		db.DB.AutoMigrate(resource.GetObject())
	}
	// Make an exception for Login
	db.DB.AutoMigrate(&Login{})
}

func GetResources() []registerrest.Resource {
	return resources
}
