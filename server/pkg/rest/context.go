package rest

import (
	"fmt"
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
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

func (cc *CustomContext) JSONIndent(code int, obj interface{}) error {
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
