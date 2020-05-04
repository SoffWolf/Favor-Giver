package rest

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
)

type CustomContext struct {
	echo.Context
	db *db.Database
}

func NewRESTServer(addr string, db *db.Database) *RESTServer {
	e := echo.New()
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			cc := &CustomContext{c, db}
			return next(cc)
		}
	})
	e.Pre(middleware.AddTrailingSlash())
	e.Use(middleware.Logger())
	//e.Use(middleware.BodyDumpWithConfig(middleware.BodyDumpConfig{}))
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

func NewAPIGroupsHandler(e *echo.Echo) *APIGroupsHandler {
	groupsHandler := e.Group("/apis")
	agh := &APIGroupsHandler{groupsHandler, make(map[string]*APIGroupHandler)}
	groupsHandler.GET("/", agh.Info)
	return agh
}

type APIGroupsHandler struct {
	groupsHandler *echo.Group
	apiGroups     map[string]*APIGroupHandler
}

func (agh *APIGroupsHandler) Info(c echo.Context) error {
	apiGroupNames := make([]string, 0, len(agh.apiGroups))
	for name := range agh.apiGroups {
		apiGroupNames = append(apiGroupNames, name)
	}
	return c.JSON(http.StatusOK, apiGroupNames)
}

func (agh *APIGroupsHandler) Add(groupName, version string) (*APIGroupHandler, error) {
	groupPath := fmt.Sprintf("%s/%s", groupName, version)
	if _, ok := agh.apiGroups[groupPath]; ok {
		return nil, fmt.Errorf("group %s already exists!", groupPath)
	}
	apiGroup := newAPIGroupHandler(agh.groupsHandler, groupName, version)
	agh.apiGroups[groupPath] = apiGroup
	return apiGroup, nil
}

func newAPIGroupHandler(groupsHandler *echo.Group, groupName, version string) *APIGroupHandler {
	groupHandler := groupsHandler.Group(fmt.Sprintf("/%s/%s", groupName, version))
	agh := &APIGroupHandler{groupName, version, groupHandler, make(map[string]*echo.Group)}
	groupHandler.GET("/", agh.Info)
	return agh
}

type APIGroupHandler struct {
	GroupName, Version string
	groupHandler       *echo.Group
	resources          map[string]*echo.Group
}

type apiGroupInfo struct {
	GroupName string   `json:"groupName"`
	Version   string   `json:"version"`
	Resources []string `json:"resources"`
}

func (agh *APIGroupHandler) Info(c echo.Context) error {
	agi := &apiGroupInfo{
		GroupName: agh.GroupName,
		Version:   agh.Version,
	}
	for name := range agh.resources {
		agi.Resources = append(agi.Resources, name)
	}
	return c.JSON(http.StatusOK, agi)
}

func (agh *APIGroupHandler) Add(resources ...ResourceHandler) error { // TODO: Should be ...Resource
	for _, r := range resources {
		err := func(resource ResourceHandler) error {
			if _, ok := agh.resources[resource.Name()]; ok {
				return fmt.Errorf("resource %s already exists!", resource.Name())
			}

			g := agh.groupHandler.Group("/" + resource.Name())
			g.GET("/", ListResource(resource))
			g.GET("/:id", GetResource(resource))
			g.POST("/", CreateResource(resource))
			g.DELETE("/:id", DeleteResource(resource))
			agh.resources[resource.Name()] = g
			return nil
		}(r)
		if err != nil {
			return err
		}
	}

	return nil
}

type Resource interface {
	Name() string // e.g. seekers
	Get(echo.Context) error
	List(echo.Context) error
	Create(echo.Context) error
	Delete(echo.Context) error
	// TODO: Subresources for updating
}

type ResourceHandler struct {
	ResourceName string
	InitObject   func() interface{}
	InitList     func() interface{}
}

func (rh *ResourceHandler) Name() string {
	return rh.ResourceName
}

func GetResource(rh ResourceHandler) func(echo.Context) error {
	return func(c echo.Context) error {
		cc := c.(*CustomContext)
		obj := rh.InitObject()
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return err
		}
		cc.db.DB.Find(obj, id)
		return c.JSON(http.StatusOK, obj)
	}
}

func ListResource(rh ResourceHandler) func(echo.Context) error {
	return func(c echo.Context) error {
		cc := c.(*CustomContext)
		list := rh.InitList()
		cc.db.DB.Find(list)
		return c.JSON(http.StatusOK, list)
	}
}

func CreateResource(rh ResourceHandler) func(echo.Context) error {
	return func(c echo.Context) error {
		cc := c.(*CustomContext)
		obj := rh.InitObject()

		// Always decode JSON
		if err := json.NewDecoder(c.Request().Body).Decode(obj); err != nil {
			return err
		}

		cc.db.DB.Create(obj)
		return c.NoContent(http.StatusCreated)
	}
}

func DeleteResource(rh ResourceHandler) func(c echo.Context) error {
	return func(c echo.Context) error {
		cc := c.(*CustomContext)
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return err
		}
		cc.db.DB.Delete(nil, id)
		return c.NoContent(http.StatusOK)
	}
}
