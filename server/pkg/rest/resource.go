package rest

import (
	"io/ioutil"
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/thechosenoneneo/favor-giver/pkg/rest/meta"
	registerrest "github.com/thechosenoneneo/favor-giver/pkg/rest/register"
	serializerpkg "github.com/thechosenoneneo/favor-giver/pkg/serializer"
)

var serializer = serializerpkg.NewDebugSerializer(ioutil.Discard)

type resourceHandler struct {
	res registerrest.Resource
	gvk meta.GroupVersionKind
}

func (rh resourceHandler) Name() string {
	return rh.res.Name()
}

func (rh resourceHandler) dbForContext(cc *CustomContext) *gorm.DB {
	tx := cc.DB()
	if cc.Request().Method == "GET" {
		if cc.QueryParam("preload") == "true" {
			for _, field := range rh.res.Preloads() {
				tx = tx.Preload(field)
			}
		} else {
			// Always load many-to-many relations
			gormTags := getFieldsWithTag(rh.res.GetObject(), "gorm")
			for fieldName, val := range gormTags {
				if strings.Contains(val, "many2many") {
					log.Printf("force preload %s", fieldName)
					tx = tx.Preload(fieldName)
				}
			}
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
	return cc.JSONIndent(http.StatusOK, obj, &rh.gvk)
}

func (rh resourceHandler) ListResource(c echo.Context) error {
	cc := c.(*CustomContext)
	list := rh.res.GetList()
	if err := rh.dbForContext(cc).Find(list).Error; err != nil {
		return cc.Errorf(http.StatusBadRequest, err)
	}
	return cc.JSONIndent(http.StatusOK, list, &rh.gvk)
}

func (rh resourceHandler) CreateResource(c echo.Context) error {
	cc := c.(*CustomContext)
	obj := rh.res.GetObject()

	// Always decode JSON
	if err := serializer.DecodeStreamInto(c.Request().Body, obj); err != nil {
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

	// TODO: Wipe/sanitize updates to prepopulated fields

	/*
		TODO: Make this check possible
		if !cc.db.DB.NewRecord(obj) {
			return cc.Stringf(http.StatusBadRequest, "Primary key field must be blank!")
		}
	*/

	if err := cc.db.DB.Create(obj).Error; err != nil {
		return cc.Errorf(http.StatusBadRequest, err)
	}

	return cc.JSONIndent(http.StatusCreated, obj, &rh.gvk)
}

func (rh resourceHandler) DeleteResource(c echo.Context) error {
	cc := c.(*CustomContext)
	obj := rh.res.GetObject()
	cc.db.DB.Delete(obj, c.Param("id"))
	return c.NoContent(http.StatusNoContent)
}

func valueOf(obj interface{}) reflect.Value {
	v := reflect.ValueOf(obj)
	if v.Kind() == reflect.Ptr {
		return v.Elem()
	}
	return v
}

func getFieldValue(obj interface{}, fieldName string) interface{} {
	return valueOf(obj).FieldByName(fieldName).Interface()
}

func extractSlice(obj interface{}, fieldName string) []interface{} {
	v := valueOf(obj)
	// if fieldname is set, use a struct field. otherwise, assume obj is a slice
	if len(fieldName) != 0 {
		v = v.FieldByName(fieldName)
	}

	// If the given value already is a struct object, return it directly as a list
	if v.Kind() == reflect.Struct {
		return []interface{}{v.Interface()}
	} else if v.Kind() != reflect.Slice {
		return nil
	}
	arr := make([]interface{}, 0, v.Len())
	for i := 0; i < v.Len(); i++ {
		arr = append(arr, v.Index(i).Interface())
	}
	return arr
}

func getFieldsWithTag(obj interface{}, tagKey string) map[string]string {
	t := valueOf(obj).Type()

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
	t := valueOf(obj).Type()
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
