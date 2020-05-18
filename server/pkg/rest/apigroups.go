package rest

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
	"github.com/thechosenoneneo/favor-giver/pkg/rest/meta"
	registerrest "github.com/thechosenoneneo/favor-giver/pkg/rest/register"
)

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

func (agh *APIGroupsHandler) Add(groupName, version string) (registerrest.APIGroupHandler, error) {
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
	agh := &APIGroupHandler{meta.GroupVersion{GroupName: groupName, Version: version}, groupHandler, make(map[string]*echo.Group)}
	groupHandler.GET("/", agh.Info)
	return agh
}

type APIGroupHandler struct {
	meta.GroupVersion
	groupHandler *echo.Group
	resources    map[string]*echo.Group
}

type apiGroupInfo struct {
	meta.GroupVersion `json:",inline"`

	Resources []string `json:"resources"`
}

func (agh *APIGroupHandler) Info(c echo.Context) error {
	agi := &apiGroupInfo{
		GroupVersion: agh.GroupVersion,
	}
	for name := range agh.resources {
		agi.Resources = append(agi.Resources, name)
	}
	return c.JSON(http.StatusOK, agi)
}

func (agh *APIGroupHandler) Add(resources ...registerrest.Resource) error {
	for _, r := range resources {
		err := func(resource registerrest.Resource) error {
			if _, ok := agh.resources[resource.Name()]; ok {
				return fmt.Errorf("resource %s already exists!", resource.Name())
			}

			rh := resourceHandler{resource, agh.GroupVersion.WithKind(getObjectKind(resource.GetObject()))}
			g := agh.groupHandler.Group("/" + resource.Name())
			g.Use(jwtAuthMiddleware())
			g.GET("/", rh.ListResource)
			g.GET("/:id/", rh.GetResource)
			g.POST("/", rh.CreateResource)
			g.DELETE("/:id/", rh.DeleteResource)
			for key, handler := range resource.UpdateHandlers() {
				g.PUT("/"+key+"/", handler)
			}
			agh.resources[resource.Name()] = g
			return nil
		}(r)
		if err != nil {
			return err
		}
	}

	return nil
}

func getObjectKind(obj interface{}) string {
	return valueOf(obj).Type().Name()
}
