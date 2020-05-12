package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	api "github.com/thechosenoneneo/favor-giver/pkg/apis/core/v1alpha1"
	"github.com/thechosenoneneo/favor-giver/pkg/client"
	dbpkg "github.com/thechosenoneneo/favor-giver/pkg/db"
	"github.com/thechosenoneneo/favor-giver/pkg/matcher"
	"github.com/thechosenoneneo/favor-giver/pkg/matcher/location/route"
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

	api.RegisterDB(db)

	s := rest.NewRESTServer(":8080", db)

	c := client.NewClient("http://localhost:8080", api.GroupVersion, api.GetResources()...)

	// Start matching thread non-blocking
	m := matcher.NewMatcher(c, route.NewMockDistanceCalculator())
	m.Start()

	apiGroups := rest.NewAPIGroupsHandler(s.Echo())
	api.RegisterREST(apiGroups)

	ch := make(chan os.Signal)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-ch
		log.Printf("Caught exit signal, stopping...")
		if err := db.DB.Close(); err != nil {
			log.Fatal(err)
		}
		os.Exit(0)
	}()

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
