package serializer

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"os"
)

func NewDebugSerializer(output io.Writer) Serializer {
	if output == nil {
		output = os.Stdout
	}
	return &debugSerializer{
		s:      serializer{},
		logger: log.New(output, "debugSerializer", log.LstdFlags),
	}
}

type debugSerializer struct {
	s      serializer
	logger *log.Logger
}

func (s *debugSerializer) Encode(obj interface{}) (b []byte, err error) {
	b, err = s.s.Encode(obj)
	s.logger.Printf("Encode(): Out: %q, Err: %v", string(b), err)
	return
}

func (s *debugSerializer) EncodeStream(w io.Writer, obj interface{}) (err error) {
	hw := newHijackWriter(w)
	err = s.s.EncodeStream(hw, obj)
	s.logger.Printf("EncodeStream(): Out: %q, Err: %v", hw.HijackedContent(), err)
	return
}

func (s *debugSerializer) DecodeInto(data []byte, obj interface{}) error {
	return s.DecodeStreamInto(bytes.NewReader(data), obj)
}

func (s *debugSerializer) DecodeStreamInto(r io.Reader, obj interface{}) (err error) {
	hr := newHijackReader(r)
	err = s.s.DecodeStreamInto(hr, obj)
	out, _ := json.Marshal(obj)
	s.logger.Printf("DecodeStreamInto(): In: %q, Out: %q, Err: %v", hr.HijackedContent(), out, err)
	return
}
