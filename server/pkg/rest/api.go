package rest

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
)

func NewRESTServer(addr string, db *db.Database) *RESTServer {
	e := echo.New()
	e.Use(customContextMiddleware(db))
	e.Pre(middleware.AddTrailingSlash())
	e.Use(middleware.Logger())
	e.GET("/", routes)
	return &RESTServer{e, addr, db}
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
