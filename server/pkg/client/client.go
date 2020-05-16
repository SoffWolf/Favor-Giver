package client

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"mime"
	"net/http"

	"github.com/thechosenoneneo/favor-giver/pkg/rest/meta"
	registerrest "github.com/thechosenoneneo/favor-giver/pkg/rest/register"
	serializerpkg "github.com/thechosenoneneo/favor-giver/pkg/serializer"
)

var (
	serializer = serializerpkg.NewDebugSerializer(ioutil.Discard)

	jsonContentType = mime.TypeByExtension(".json")
)

func NewClient(address string, gv meta.GroupVersion, resources ...registerrest.Resource) *Client {
	resourceMap := make(map[string]registerrest.Resource, len(resources))
	for _, resource := range resources {
		resourceMap[resource.Name()] = resource
	}
	return &Client{
		addr:      address, // validate URL to have both protocol and host
		gv:        gv,
		resources: resourceMap,
		clients:   make(map[string]ResourceClient),
	}
}

type Client struct {
	addr      string
	gv        meta.GroupVersion
	resources map[string]registerrest.Resource
	clients   map[string]ResourceClient
}

func (c *Client) Dynamic(resourceName string) ResourceClient {
	if rc, ok := c.clients[resourceName]; ok {
		return rc
	}
	if res, ok := c.resources[resourceName]; ok {
		url := fmt.Sprintf("%s/apis/%s/%s/%s", c.addr, c.gv.GroupName, c.gv.Version, res.Name())
		rc := newResourceClient(url, res)
		c.clients[res.Name()] = rc
		return rc
	}
	return notFoundRC
}

type ResourceClient interface {
	Get(id string) (interface{}, error)
	List() (interface{}, error)

	Post(obj interface{}) (interface{}, error)
	Put(subResource string, obj interface{}) (interface{}, error)

	Delete(id string) (interface{}, error)
}

func newResourceClient(url string, resource registerrest.Resource) ResourceClient {
	return &resourceClient{
		url:      url,
		resource: resource,
	}
}

type resourceClient struct {
	url      string
	resource registerrest.Resource
}

func (rc *resourceClient) Get(id string) (interface{}, error) {
	return rc.do(http.MethodGet, fmt.Sprintf("%s/%s", rc.url, id), rc.resource.GetObject, nil)
}

func (rc *resourceClient) List() (interface{}, error) {
	return rc.do(http.MethodGet, rc.url, rc.resource.GetList, nil)
}

func (rc *resourceClient) do(method, url string, initObj func() interface{}, body io.Reader) (interface{}, error) {
	obj := initObj()
	req, err := http.NewRequest(method, url+"?preload=true", body)
	if err != nil {
		return nil, err
	}

	if method == http.MethodPost || method == http.MethodPut {
		req.Header.Set("Content-Type", jsonContentType)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// TODO: Ugly
	if method == http.MethodGet && resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code for %s request: %s", method, resp.Status)
	}
	if method == http.MethodPost && !(resp.StatusCode == http.StatusCreated || resp.StatusCode == http.StatusOK) {
		return nil, fmt.Errorf("unexpected status code for %s request: %s", method, resp.Status)
	}
	if (method == http.MethodPut || method == http.MethodDelete) && !(resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusNoContent) {
		return nil, fmt.Errorf("unexpected status code for %s request: %s", method, resp.Status)
	}

	// There's nothing to decode (presumably)
	if resp.StatusCode == http.StatusNoContent {
		return nil, nil
	}

	// TODO: Maybe check/respect content-type in resp?

	// If status is OK or Created, expect a JSON response
	if err := serializer.DecodeStreamInto(resp.Body, obj); err != nil {
		return nil, err
	}
	return obj, nil
}

func (rc *resourceClient) Post(obj interface{}) (interface{}, error) {
	buf := new(bytes.Buffer)
	if err := serializer.EncodeStream(buf, obj); err != nil {
		return nil, err
	}

	return rc.do(http.MethodPost, rc.url, rc.resource.GetObject, buf)
}

func (rc *resourceClient) Put(subResource string, obj interface{}) (interface{}, error) {
	buf := new(bytes.Buffer)
	if err := serializer.EncodeStream(buf, obj); err != nil {
		return nil, err
	}

	url := rc.url
	if len(subResource) != 0 {
		url += "/" + subResource
	}

	return rc.do(http.MethodPut, url, rc.resource.GetObject, buf)
}

func (rc *resourceClient) Delete(id string) (interface{}, error) {
	return rc.do(http.MethodDelete, fmt.Sprintf("%s/%s", rc.url, id), rc.resource.GetObject, nil)
}
