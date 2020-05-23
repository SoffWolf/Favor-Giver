package rest

import (
	"fmt"
	"log"
	"reflect"
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
	"github.com/thechosenoneneo/favor-giver/pkg/rest/meta"
)

type CustomContext struct {
	echo.Context
	db *db.Database
}

func customContextMiddleware(db *db.Database) func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			cc := &CustomContext{c, db}
			return next(cc)
		}
	}
}

func (cc *CustomContext) JSONIndent(code int, obj interface{}, gvk *meta.GroupVersionKind) error {
	if gvk != nil {
		setGVK(obj, *gvk)
	}
	return cc.JSONPretty(code, obj, "  ")
}

func (cc *CustomContext) Stringf(code int, format string, args ...interface{}) error {
	if !strings.HasSuffix(format, "\n") {
		format += "\n"
	}
	return cc.Context.String(code, fmt.Sprintf(format, args...))
}

func (cc *CustomContext) Errorf(code int, err error) error {
	return cc.Stringf(code, err.Error())
}

func (cc *CustomContext) DB() *gorm.DB {
	return cc.db.DB
}

func (cc *CustomContext) EmailAndPassword() (email, password string, err error) {
	email = cc.FormValue("email")
	password = cc.FormValue("password")
	if len(email) == 0 || len(password) == 0 {
		err = echo.ErrUnauthorized
	}
	// TODO: Verify/parse the email, and make sure the password is of a certain length
	// Also check upper bounds on the lengths to prevent sending a super-long password to DoS
	return
}

func setGVK(obj interface{}, gvk meta.GroupVersionKind) {
	if rm, ok := obj.(meta.ResourceMeta); ok {
		rm.SetAPIVersion(gvk.APIVersion())
		rm.SetKind(gvk.Kind)
		return
	}
	v := valueOf(obj)
	if v.Kind() != reflect.Slice {
		log.Printf("requested a GVK set but was unable to")
		return
	}
	for i := 0; i < v.Len(); i++ {
		el := v.Index(i) // TODO: Use reflect.PtrTo() here so we don't need to embed TypeMeta as a pointer
		if el.CanInterface() {
			if rm, ok := el.Interface().(meta.ResourceMeta); ok {
				rm.SetAPIVersion(gvk.APIVersion())
				rm.SetKind(gvk.Kind)
				continue
			}
		}
		log.Printf("requested a GVK set but was unable to for i=%d", i)
	}
}
