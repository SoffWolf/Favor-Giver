package v1alpha1

import (
	"net/http"

	"github.com/labstack/echo"
)

func SubResourceTasksMatch(c echo.Context) error {
	return c.String(http.StatusOK, "Hello from PUT subresource 'match'")
}
