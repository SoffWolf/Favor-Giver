package v1alpha1

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

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
