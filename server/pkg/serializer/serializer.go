package serializer

import (
	"bytes"
	"encoding/json"
	"io"
)

type Serializer interface {
	Encode(obj interface{}) ([]byte, error)
	EncodeStream(w io.Writer, obj interface{}) error

	DecodeInto(data []byte, obj interface{}) error
	DecodeStreamInto(r io.Reader, obj interface{}) error
}

func NewSerializer() Serializer {
	return &serializer{}
}

type serializer struct{}

func (s *serializer) Encode(obj interface{}) ([]byte, error) {
	return json.MarshalIndent(obj, "", "  ")
}

func (s *serializer) EncodeStream(w io.Writer, obj interface{}) error {
	e := json.NewEncoder(w)
	e.SetIndent("", "  ")
	return e.Encode(obj)
}

func (s *serializer) DecodeInto(data []byte, obj interface{}) error {
	return s.DecodeStreamInto(bytes.NewReader(data), obj)
}

func (s *serializer) DecodeStreamInto(r io.Reader, obj interface{}) error {
	d := json.NewDecoder(r)
	d.DisallowUnknownFields()
	return d.Decode(obj)
}
