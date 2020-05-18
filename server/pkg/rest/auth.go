package rest

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/thechosenoneneo/favor-giver/pkg/apis/core/v1alpha1"
	"github.com/thechosenoneneo/favor-giver/pkg/rest/hash"
)

func initRSAKey() (err error) {
	// TODO: Re-enable RSA
	/*privateKey, err = rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return
	}
	var f *os.File
	f, err = os.Create("jwt.key")
	if err != nil {
		return
	}
	defer f.Close()

	err = pem.Encode(f, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	})*/
	return
}

type jwtCustomClaims struct {
	//Name  string `json:"name"`
	//Admin bool   `json:"admin"`
	jwt.StandardClaims
}

var (
	hasher = hash.NewHasher()
	// signingMethod = jwt.SigningMethodRS512
	// privateKey *rsa.PrivateKey

	signingMethod = jwt.SigningMethodHS512
	privateKey    = []byte("supersecret!")
)

const (
	defaultAlgo        = hash.SHA3_512
	sessionIDBytes     = 32
	saltBytes          = 32
	favorGiverIssuer   = "favor-giver"
	tokenValidDuration = 24 * time.Hour
)

func jwtAuthMiddleware() func(next echo.HandlerFunc) echo.HandlerFunc {
	return middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey:    privateKey,
		SigningMethod: signingMethod.Name,
	})
}

func login(c echo.Context) error {
	cc := c.(*CustomContext)
	email := c.FormValue("email")
	if len(email) == 0 {
		return echo.ErrUnauthorized
	}
	password := c.FormValue("password")
	if len(password) == 0 {
		return echo.ErrUnauthorized
	}

	login := &v1alpha1.Login{}
	if cc.DB().Find(login, "email = ?", email).RecordNotFound() {
		return echo.ErrUnauthorized
	}

	payload := []byte(fmt.Sprintf("%s%s%s", login.Salt, login.Email, password))

	if !hasher.Verify(login.Hash, payload) {
		return echo.ErrUnauthorized
	}

	signedToken, sessID, err := newJWTToken()
	if err != nil {
		return err
	}

	// if an user logs in twice, the older session ID is invalidated (hmm, is this good?)
	login.SessionID = sessID
	if err := cc.DB().Save(login).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": signedToken,
	})
}

func register(c echo.Context) error {
	cc := c.(*CustomContext)
	email := c.FormValue("email")
	if len(email) == 0 {
		return echo.ErrUnauthorized
	}
	password := c.FormValue("password")
	if len(password) == 0 {
		return echo.ErrUnauthorized
	}

	login := &v1alpha1.Login{
		Email: email,
	}

	salt, err := genRandom(saltBytes)
	if err != nil {
		return err
	}
	login.Salt = hex.EncodeToString(salt)
	payload := []byte(fmt.Sprintf("%s%s%s", login.Salt, login.Email, password))

	obj := hasher.Hash(defaultAlgo, payload)
	if obj == nil {
		return fmt.Errorf("couldn't hash object")
	}
	login.Hash = obj.String()

	signedToken, sessID, err := newJWTToken()
	if err != nil {
		return err
	}

	login.SessionID = sessID

	if err := cc.DB().Save(login).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": signedToken,
	})
}

func newJWTToken() (signedToken string, sessID string, err error) {
	sessIDBytes, err := genRandom(sessionIDBytes)
	if err != nil {
		return
	}
	sessID = hex.EncodeToString(sessIDBytes)

	now := time.Now()
	claims := &jwtCustomClaims{
		jwt.StandardClaims{
			ExpiresAt: now.Add(tokenValidDuration).Unix(),
			IssuedAt:  now.Unix(),
			NotBefore: now.Unix(),
			Id:        sessID,
			Issuer:    favorGiverIssuer,
		},
	}

	token := jwt.NewWithClaims(signingMethod, claims)

	signedToken, err = token.SignedString(privateKey)
	return
}

func genRandom(numBytes int) ([]byte, error) {
	b := make([]byte, numBytes)
	n, err := rand.Read(b)
	if err != nil {
		return nil, err
	}
	if n != numBytes {
		return nil, fmt.Errorf("not enough bytes read from random generator")
	}
	return b, nil
}
