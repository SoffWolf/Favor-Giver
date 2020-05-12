package client

import (
	"errors"
)

var (
	notFoundRC ResourceClient = &notFoundResourceClient{}

	ErrorResourceNotFound = errors.New("resource not found")
)

type notFoundResourceClient struct{}

func (rc *notFoundResourceClient) Get(id string) (interface{}, error) {
	return nil, ErrorResourceNotFound
}

func (rc *notFoundResourceClient) List() (interface{}, error) {
	return nil, ErrorResourceNotFound
}

func (rc *notFoundResourceClient) Post(obj interface{}) (interface{}, error) {
	return nil, ErrorResourceNotFound
}

func (rc *notFoundResourceClient) Put(subResource string, obj interface{}) (interface{}, error) {
	return nil, ErrorResourceNotFound
}

func (rc *notFoundResourceClient) Delete(id string) (interface{}, error) {
	return nil, ErrorResourceNotFound
}
