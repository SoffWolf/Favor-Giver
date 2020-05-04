package main

import (
	"log"

	dbpkg "github.com/luxas/favorgiver/pkg/db"
	"github.com/luxas/favorgiver/pkg/rest"
	"github.com/luxas/favorgiver/pkg/types"
)

var (
	resources = []rest.ResourceHandler{
		{
			ResourceName: "helpers",
			InitObject: func() interface{} {
				return &types.Helper{}
			},
			InitList: func() interface{} {
				return &[]types.Helper{}
			},
		},
		{
			ResourceName: "seekers",
			InitObject: func() interface{} {
				return &types.Seeker{}
			},
			InitList: func() interface{} {
				return &[]types.Seeker{}
			},
		},
		{
			ResourceName: "tasks",
			InitObject: func() interface{} {
				return &types.Task{}
			},
			InitList: func() interface{} {
				return &[]types.Task{}
			},
		},
	}
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	db, err := dbpkg.NewDatabase("foo.db")
	if err != nil {
		return err
	}
	defer db.DB.Close()

	for _, resource := range resources {
		db.DB.AutoMigrate(resource.InitObject())
	}

	s := rest.NewRESTServer(":8080", db)

	apiGroups := rest.NewAPIGroupsHandler(s.Echo())
	coreAPIGroup, _ := apiGroups.Add("core.favorgiver.io", "v1alpha1")
	coreAPIGroup.Add(resources...)

	s.Start()
	return nil
}
