package main

import (
	"log"

	api "github.com/thechosenoneneo/favor-giver/pkg/apis/core/v1alpha1"
	dbpkg "github.com/thechosenoneneo/favor-giver/pkg/db"
	"github.com/thechosenoneneo/favor-giver/pkg/rest"
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

	api.RegisterDB(db)

	s := rest.NewRESTServer(":8080", db)

	apiGroups := rest.NewAPIGroupsHandler(s.Echo())
	api.RegisterREST(apiGroups)

	s.Start()
	return nil
}

/* Use the distance algorithm
dc, err := route.NewDistanceCalculator(apikey)
if err != nil {
	return err
}
dr, err := dc.GetDistance("Prästströmsvägen 10, Jakobstad", "Handelsesplanaden 17, Vasa")
if err != nil {
	return err
}
fmt.Printf("Kms: %f, Duration: %s", dr.Kilometers, dr.Time)
*/
