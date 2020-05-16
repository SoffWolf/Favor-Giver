package route

import (
	"context"
	"fmt"
	"time"

	"googlemaps.github.io/maps"
)

type DistanceResponse struct {
	Time       time.Duration
	Kilometers float64
}

func NewDistanceCalculator(mapsAPIKey string) (DistanceCalculator, error) {
	c, err := maps.NewClient(maps.WithAPIKey(mapsAPIKey))
	if err != nil {
		return nil, err
	}

	return &distanceCalculator{c}, nil
}

type DistanceCalculator interface {
	GetDistance(from, to string) (*DistanceResponse, error)
}

type distanceCalculator struct {
	c *maps.Client
}

func (dc *distanceCalculator) GetDistance(from, to string) (*DistanceResponse, error) {
	routes, _, err := dc.c.Directions(context.Background(), &maps.DirectionsRequest{
		Origin:      from,
		Destination: to,
		Mode:        maps.TravelModeDriving,
		Units:       maps.UnitsMetric,
	})
	if err != nil {
		return nil, err
	}

	if len(routes) == 0 {
		return nil, fmt.Errorf("no routes returned!")
	}

	dr := &DistanceResponse{}
	for _, route := range routes {
		kmsum := float64(0)
		totaltime := int64(0)
		for _, leg := range route.Legs {
			kmsum += float64(leg.Meters) / 1000
			totaltime += leg.Duration.Nanoseconds()
		}
		if totaltime < dr.Time.Nanoseconds() || dr.Time.Nanoseconds() == 0 {
			dr.Kilometers = kmsum
			dr.Time = time.Duration(totaltime)
		}
	}
	return dr, nil
}
