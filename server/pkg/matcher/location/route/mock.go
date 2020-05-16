package route

import (
	"math/rand"
	"time"
)

func NewMockDistanceCalculator() DistanceCalculator {
	rand.Seed(time.Now().UnixNano())
	return &mockDistanceCalculator{}
}

type mockDistanceCalculator struct{}

func (dc *mockDistanceCalculator) GetDistance(from, to string) (*DistanceResponse, error) {
	return &DistanceResponse{
		Kilometers: 2 + rand.Float64()*6,                                       // between 2 and 8 kilometers
		Time:       time.Duration(float64(time.Minute*5) * rand.Float64() * 4), // between 5 and 20 minutes
	}, nil
}
