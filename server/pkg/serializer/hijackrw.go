package serializer

import (
	"bytes"
	"io"
)

func newHijackReader(r io.Reader) *hijackReader {
	return &hijackReader{r, new(bytes.Buffer)}
}

type hijackReader struct {
	r   io.Reader
	buf *bytes.Buffer
}

func (r *hijackReader) Read(p []byte) (n int, err error) {
	n, err = r.r.Read(p)
	r.buf.Write(p)
	return
}
func (r *hijackReader) HijackedContent() string {
	return showHijackedContent(r.buf)
}

func newHijackWriter(w io.Writer) *hijackWriter {
	return &hijackWriter{w, new(bytes.Buffer)}
}

type hijackWriter struct {
	w   io.Writer
	buf *bytes.Buffer
}

func (r *hijackWriter) Write(p []byte) (n int, err error) {
	n, err = r.w.Write(p)
	r.buf.Write(p)
	return
}
func (r *hijackWriter) HijackedContent() string {
	return showHijackedContent(r.buf)
}

func showHijackedContent(buf *bytes.Buffer) string {
	line, err := buf.ReadString(0)
	if err == nil {
		return line
	}
	return buf.String()
}
