package rest

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	registerrest "github.com/thechosenoneneo/favor-giver/pkg/rest/register"
)

type resourceHandler struct {
	res registerrest.Resource
}

func (rh resourceHandler) Name() string {
	return rh.res.Name()
}

func (rh resourceHandler) dbForContext(cc *CustomContext) *gorm.DB {
	tx := cc.DB()
	if cc.Request().Method == "GET" && cc.QueryParam("preload") == "true" {
		for _, field := range rh.res.Preloads() {
			tx = tx.Preload(field)
		}
	}
	return tx
}

func (rh resourceHandler) GetResource(c echo.Context) error {
	cc := c.(*CustomContext)
	obj := rh.res.GetObject()
	id := c.Param("id")

	if rh.dbForContext(cc).Where("id = ?", id).First(obj).RecordNotFound() {
		return cc.Stringf(http.StatusBadRequest, "ID %q does not exist!", id)
	}
	return cc.JSONIndent(http.StatusOK, obj)
}

func (rh resourceHandler) ListResource(c echo.Context) error {
	cc := c.(*CustomContext)
	list := rh.res.GetList()
	if err := rh.dbForContext(cc).Find(list).Error; err != nil {
		return cc.Errorf(http.StatusBadRequest, err)
	}
	return cc.JSONIndent(http.StatusOK, list)
}

func (rh resourceHandler) CreateResource(c echo.Context) error {
	cc := c.(*CustomContext)
	obj := rh.res.GetObject()

	// Always decode JSON
	if err := decode(c.Request().Body, obj); err != nil {
		return cc.Errorf(http.StatusBadRequest, err)
	}

	// MAGIC! TODO: Recursive searching
	gormTags := getFieldsWithTag(obj, "gorm")
	for fieldName, val := range gormTags {
		if strings.Contains(val, "many2many") {
			slice := extractSlice(obj, fieldName)
			for _, elem := range slice {
				id := getFieldValue(elem, "ID")
				cc.DB().Find(elem, "id = ?", id)
			}
		}
	}

	/*if !cc.db.DB.NewRecord(obj) {
		return cc.Stringf(http.StatusBadRequest, "Primary key field must be blank!")
	}*/

	if err := cc.db.DB.Create(obj).Error; err != nil {
		return cc.Errorf(http.StatusBadRequest, err)
	}

	return cc.JSONIndent(http.StatusCreated, obj)
}

func (rh resourceHandler) DeleteResource(c echo.Context) error {
	cc := c.(*CustomContext)
	cc.db.DB.Delete(nil, c.Param("id"))
	return c.NoContent(http.StatusOK)
}

func decode(rc io.ReadCloser, obj interface{}) (err error) {
	hrc := &hijackReadCloser{rc, new(bytes.Buffer)}
	d := json.NewDecoder(hrc)
	d.DisallowUnknownFields()
	err = d.Decode(obj)
	out, _ := json.Marshal(obj)
	log.Printf("Input data: %s, output: %s", hrc.HijackedContent(), out)
	return
}

type hijackReadCloser struct {
	rc  io.ReadCloser
	buf *bytes.Buffer
}

func (r *hijackReadCloser) Read(p []byte) (n int, err error) {
	n, err = r.rc.Read(p)
	r.buf.Write(p)
	return
}

func (r *hijackReadCloser) Close() error {
	return r.rc.Close()
}

func (r *hijackReadCloser) HijackedContent() []byte {
	return r.buf.Bytes()
}

func getFieldValue(obj interface{}, fieldName string) interface{} {
	v := reflect.ValueOf(obj)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	return v.FieldByName(fieldName).Interface()
}

func extractSlice(obj interface{}, fieldName string) []interface{} {
	v := reflect.ValueOf(obj)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	f := v.FieldByName(fieldName)
	if f.Kind() != reflect.Slice {
		return nil
	}
	arr := make([]interface{}, 0, f.Len())
	for i := 0; i < f.Len(); i++ {
		arr = append(arr, f.Index(i).Interface())
	}
	return arr
}

func getFieldsWithTag(obj interface{}, tagKey string) map[string]string {
	t := reflect.TypeOf(obj)
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}

	result := map[string]string{} // map field name to its tag value
	for i := 0; i < t.NumField(); i++ {
		fieldName := t.Field(i).Name
		m := getStructTags(obj, fieldName)
		if tagVal, ok := m[tagKey]; ok {
			result[fieldName] = tagVal
		}
	}
	return result
}

func getStructTags(obj interface{}, fieldName string) map[string]string {
	t := reflect.TypeOf(obj)
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	field, ok := t.FieldByName(fieldName)
	if !ok {
		panic("Field not found")
	}
	tagStr := string(field.Tag)
	tags := strings.Split(tagStr, " ")
	m := make(map[string]string, len(tags))
	for _, tag := range tags {
		tagParts := strings.Split(tag, `:"`)
		if len(tagParts) == 2 {
			m[tagParts[0]] = strings.TrimSuffix(tagParts[1], `"`)
		}
	}
	return m
}
