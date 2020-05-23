package rest

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
)

func NewRESTServer(addr string, db *db.Database) (*RESTServer, error) {
	e := echo.New()
	e.Use(customContextMiddleware(db))
	e.Pre(middleware.AddTrailingSlash())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/", routes)
	e.POST("/login/", login)
	e.POST("/register/", register)
	if err := initRSAKey(); err != nil {
		return nil, err
	}
	return &RESTServer{e, addr, db}, nil
}

type RESTServer struct {
	e    *echo.Echo
	addr string
	db   *db.Database
}

func (s *RESTServer) Start() error {
	return s.e.Start(s.addr)
}

func (s *RESTServer) Echo() *echo.Echo {
	return s.e
}

func routes(c echo.Context) error {
	return c.JSONPretty(http.StatusOK, c.Echo().Routes(), "  ")
}
