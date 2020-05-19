package db

import (
	"encoding/hex"
	"fmt"
	"time"

	"github.com/thechosenoneneo/favor-giver/pkg/rest/hash"
)

const (
	SessionIDBytes = 32
	SaltBytes      = 32
	SessionValid   = 24 * time.Hour
)

var hasher = hash.NewHasher()

type Account struct {
	Email     string    `json:"-" gorm:"primary_key"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`

	Salt string `json:"-"` // 32-byte random slice, hex-encoded string (64-char long)
	Hash string `json:"-"` // string encoded as <hash-alg>:<hash-digest of H(salt + email + password), hex-encoded>

	*Session `json:"-"`
}

type Session struct {
	SessionID    string    `json:"-"` // 32-byte random session ID, hex-encoded (64-char long). Used for one JWT token per user
	SessionStart time.Time `json:"-"` // timestamp when session JWT token was issued
}

func (s Session) ValidUntil() time.Time {
	return s.SessionStart.Add(SessionValid)
}

func (s Session) IsExpired() bool {
	return !s.SessionStart.IsZero() && s.ValidUntil().Before(time.Now())
}

func (s Session) IsValid() bool {
	if len(s.SessionID) != hex.EncodedLen(SessionIDBytes) {
		return false
	}
	if s.SessionStart.IsZero() {
		return false
	}
	return true
}

// Payload returns the byte payload used for the Hash function, as follows: "<algo>:<HEX( H( payload ) )>"
// Payload combines the salt, email and password after each other, to ensure the Hash digest will be unique
func (a Account) Payload(password string) ([]byte, error) {
	if len(password) == 0 {
		return nil, fmt.Errorf("password cannot be empty!")
	}
	if len(a.Salt) == 0 || len(a.Email) == 0 {
		return nil, fmt.Errorf("account is not properly set up, missing salt or email fields")
	}
	return []byte(fmt.Sprintf("%s%s%s", a.Salt, a.Email, password)), nil
}

// Verify verifies if the given password matches what's stored in the Hash field
func (a Account) VerifyPassword(password string) error {
	payload, err := a.Payload(password)
	if err != nil {
		return err
	}
	if !hasher.Verify(a.Hash, payload) {
		return fmt.Errorf("password is incorrect!")
	}
	return nil
}

// SetPassword sets the password using the specified hashing algorithm
// It expects the salt and email to be already populated
// It errors in case there already is a password set
func (a *Account) SetPassword(algo hash.Algorithm, password string) error {
	if len(a.Hash) != 0 {
		return fmt.Errorf("password is already populated!")
	}

	payload, err := a.Payload(password)
	if err != nil {
		return err
	}

	obj := hasher.Hash(algo, payload)
	if obj == nil {
		return fmt.Errorf("couldn't hash object")
	}
	a.Hash = obj.String()
	return nil
}

// PopulateSalt sets the salt field using random bytes. It must not already be set
func (a *Account) PopulateSalt() error {
	if len(a.Salt) != 0 {
		return fmt.Errorf("salt field is already populated")
	}
	salt, err := hash.GenerateRandomBytes(SaltBytes)
	if err != nil {
		return err
	}
	a.Salt = hex.EncodeToString(salt)
	return nil
}

// GetSession gets the current session, or creates a new one if there is no one.
// In case the session has expired, a new one is created.
// The bool flag is true in case a new session was created
func (a *Account) GetSession() (*Session, bool, error) {
	if a.Session != nil && !a.Session.IsExpired() {
		if a.Session.IsValid() {
			return a.Session, false, nil
		} else {
			return nil, false, fmt.Errorf("session is not valid!")
		}
	}

	sessIDBytes, err := hash.GenerateRandomBytes(SessionIDBytes)
	if err != nil {
		return nil, false, err
	}
	a.Session = &Session{
		SessionID:    hex.EncodeToString(sessIDBytes),
		SessionStart: time.Now(),
	}
	return a.Session, true, nil
}
