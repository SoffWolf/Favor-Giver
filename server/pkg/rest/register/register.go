package register

import "github.com/labstack/echo"

// UpdateHandlerMap specifies handlers for PUT requests. The key specifies the subresource path. If key == "" => top-level PUT
type UpdateHandlerMap map[string]echo.HandlerFunc

type Resource interface {
	Name() string // e.g. seekers
	GetObject() interface{}
	GetList() interface{}
	UpdateHandlers() UpdateHandlerMap
	Preloads() []string
}

type resource struct {
	name           string
	getObj         func() interface{}
	getList        func() interface{}
	updateHandlers UpdateHandlerMap
	preloads       []string
}

func (r *resource) Name() string {
	return r.name
}

func (r *resource) GetObject() interface{} {
	return r.getObj()
}

func (r *resource) GetList() interface{} {
	return r.getList()
}

func (r *resource) UpdateHandlers() UpdateHandlerMap {
	return r.updateHandlers
}

func (r *resource) Preloads() []string {
	return r.preloads
}

func NewResource(name string, getObj func() interface{}, getList func() interface{}, updateHandlers UpdateHandlerMap, preloads []string) Resource {
	return &resource{name, getObj, getList, updateHandlers, preloads}
}
