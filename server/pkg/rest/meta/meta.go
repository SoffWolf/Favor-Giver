package meta

import "fmt"

type TypeMeta struct {
	APIVersion string `json:"apiVersion,omitempty" gorm:"-"`
	Kind       string `json:"kind,omitempty"  gorm:"-"`
}

func (tm TypeMeta) GetAPIVersion() string {
	return tm.APIVersion
}

func (tm *TypeMeta) SetAPIVersion(apiVersion string) {
	tm.APIVersion = apiVersion
}

func (tm TypeMeta) GetKind() string {
	return tm.Kind
}

func (tm *TypeMeta) SetKind(kind string) {
	tm.Kind = kind
}

var _ ResourceMeta = &TypeMeta{}

type ResourceMeta interface {
	GetAPIVersion() string
	SetAPIVersion(apiVersion string)
	GetKind() string
	SetKind(kind string)
}

type GroupVersion struct {
	GroupName string `json:"groupName"`
	Version   string `json:"version"`
}

func (gv GroupVersion) APIVersion() string {
	return fmt.Sprintf("%s/%s", gv.GroupName, gv.Version)
}

func (gv GroupVersion) WithKind(kind string) GroupVersionKind {
	return GroupVersionKind{
		GroupName: gv.GroupName,
		Version:   gv.Version,
		Kind:      kind,
	}
}

type GroupVersionKind struct {
	GroupName string `json:"groupName"`
	Version   string `json:"version"`
	Kind      string `json:"kind"`
}

func (gv GroupVersionKind) APIVersion() string {
	return fmt.Sprintf("%s/%s", gv.GroupName, gv.Version)
}
