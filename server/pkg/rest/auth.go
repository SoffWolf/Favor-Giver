package rest

import (
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/thechosenoneneo/favor-giver/pkg/db"
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
	jwt.StandardClaims
}

var (
	loopbackJWTs = &sync.Map{}

	// signingMethod = jwt.SigningMethodRS512
	// privateKey *rsa.PrivateKey

	signingMethod = jwt.SigningMethodHS512
	privateKey    = []byte("supersecret!")
)

const (
	defaultAlgo              = hash.SHA3_512
	favorUserGiverIssuer     = "favor-giver-user"
	favorLoopbackGiverIssuer = "favor-giver-loopback"
)

func jwtAuthMiddleware() func(next echo.HandlerFunc) echo.HandlerFunc {
	return middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey:    privateKey,
		SigningMethod: signingMethod.Name,
		Claims:        &jwtCustomClaims{},
	})
}

func sessionAuthMiddleware() func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			cc := c.(*CustomContext)
			user, ok := c.Get("user").(*jwt.Token)
			if !ok {
				return fmt.Errorf("expected user data post-authentication")
			}
			claims, ok := user.Claims.(*jwtCustomClaims)
			if !ok {
				return fmt.Errorf("couldn't get custom claims")
			}

			switch claims.Issuer {
			case favorUserGiverIssuer:
				if cc.DB().Find(&db.Account{}, "session_id = ?", claims.Id).RecordNotFound() {
					log.Printf("did not find a user account with session_id: %s", claims.Id)
					return echo.ErrUnauthorized
				}
			case favorLoopbackGiverIssuer:
				if _, ok := loopbackJWTs.Load(claims.Id); !ok {
					log.Printf("did not find a loopback account with session_id: %s", claims.Id)
					return echo.ErrUnauthorized
				}
			default:
				return echo.ErrUnauthorized
			}

			return next(c)
		}
	}
}

func login(c echo.Context) error {
	cc := c.(*CustomContext)
	// Aquire email and password from the request
	email, password, err := cc.EmailAndPassword()
	if err != nil {
		log.Printf("email/password not valid: %v", err)
		return err
	}

	// Load the account record by email
	account := &db.Account{}
	if cc.DB().Find(account, "email = ?", email).RecordNotFound() {
		log.Printf("no such email found: %s", email)
		return echo.ErrUnauthorized
	}

	// Verify that the password is correct
	if err := account.VerifyPassword(password); err != nil {
		log.Printf("verify password error: %v", err)
		return echo.ErrUnauthorized
	}

	// Create a new session for the user
	sess, modified, err := account.GetSession()
	if err != nil {
		log.Printf("get session error: %v", err)
		return err
	}

	// Save the record in the database, in case the session was changed
	if modified {
		if err := cc.DB().Save(account).Error; err != nil {
			log.Printf("save to database error: %v", err)
			return err
		}
	}

	// Create a new or regenerate an existing token based on that session information
	signedToken, err := NewUserJWTToken(sess)
	if err != nil {
		log.Printf("sign token error: %v", err)
		return err
	}

	// Return the token
	return c.JSON(http.StatusOK, echo.Map{
		"token": signedToken,
	})
}

func register(c echo.Context) error {
	cc := c.(*CustomContext)
	// Aquire email and password from the request
	email, password, err := cc.EmailAndPassword()
	if err != nil {
		return err
	}

	// Error out if there's already an email address with this token!
	if !cc.DB().Find(&db.Account{}, "email = ?", email).RecordNotFound() {
		return echo.ErrBadRequest
	}

	account := &db.Account{
		Email: email,
	}

	// Set the Salt field
	if err := account.PopulateSalt(); err != nil {
		return err
	}

	// Set the Hash field (i.e. store the password)
	if err := account.SetPassword(defaultAlgo, password); err != nil {
		return err
	}

	// Create a new session for the user
	sess, _, err := account.GetSession()
	if err != nil {
		return err
	}

	// Save the record in the database
	if err := cc.DB().Save(account).Error; err != nil {
		return err
	}

	// Create a new token based on that session information
	signedToken, err := NewUserJWTToken(sess)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": signedToken,
	})
}

func NewUserJWTToken(sess *db.Session) (string, error) {
	claims := &jwtCustomClaims{
		jwt.StandardClaims{
			ExpiresAt: sess.ValidUntil().Unix(),
			IssuedAt:  sess.SessionStart.Unix(),
			NotBefore: sess.SessionStart.Unix(),
			Id:        sess.SessionID,
			Issuer:    favorUserGiverIssuer,
		},
	}

	return jwt.NewWithClaims(signingMethod, claims).SignedString(privateKey)
}

// NewLoopbackRootJWTToken creates a new JWT root token used for "loopback" purposes
//
func NewLoopbackRootJWTToken() (string, error) {
	b, err := hash.GenerateRandomBytes(db.SessionIDBytes)
	if err != nil {
		return "", err
	}
	kid := hex.EncodeToString(b)
	claims := &jwtCustomClaims{
		jwt.StandardClaims{
			// Never expires. This could be done better!
			IssuedAt:  time.Now().Unix(),
			NotBefore: time.Now().Unix(),
			Id:        kid,
			Issuer:    favorLoopbackGiverIssuer,
		},
	}

	// Store the loopback JWT key ID in the map, for later authentication
	loopbackJWTs.Store(kid, true)

	return jwt.NewWithClaims(signingMethod, claims).SignedString(privateKey)
}
