package hash

import (
	"crypto/rand"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"hash"
	"strings"

	"golang.org/x/crypto/sha3"
)

// Algorithm is an enum of what different hashing algorithms are supported by the Hasher
type Algorithm string

const (
	// SHA2_256 uses the SHA-2 256-bit algorithm, commonly referred to as just sha256
	SHA2_256 Algorithm = "sha2-256"
	// SHA2_512 uses the SHA-2 512-bit algorithm, commonly referred to as just sha512
	SHA2_512 Algorithm = "sha2-512"
	// SHA3_256 uses the SHA-3 256-bit algorithm
	SHA3_256 Algorithm = "sha3-256"
	// SHA3_512 uses the SHA-3 512-bit algorithm
	SHA3_512 Algorithm = "sha3-512"
)

// hashers is a map describing the supported hash algorithms
var hashers = map[Algorithm]CreateHashFunc{
	SHA2_256: sha256.New,
	SHA2_512: sha512.New,
	SHA3_256: sha3.New256,
	SHA3_512: sha3.New512,
}

// SupportedHashAlgorithms returns the supported hash algorithms for this program
func SupportedHashAlgorithms() (algos []Algorithm) {
	for algo := range hashers {
		algos = append(algos, algo)
	}
	return
}

// CreateHashFunc is a function which returns Golang's hash.Hash objects
type CreateHashFunc func() hash.Hash

// Hasher is an interface for hashing and verifying data using various algorithms
type Hasher interface {
	// Hash returns the digest of the preferred hashing algorithm as an Object interface
	Hash(algo Algorithm, payload []byte) Object

	// Verify
	Verify(objectStr string, payload []byte) bool
}

func NewHasher() Hasher {
	return &hasher{}
}

type hasher struct{}

func (h hasher) Hash(algo Algorithm, payload []byte) Object {
	hashFn, ok := hashers[algo]
	if !ok {
		return nil
	}
	hasher := hashFn()
	hasher.Write(payload)
	return object{
		algo: algo,
		hash: hasher.Sum(nil),
		size: uint8(hasher.Size()),
	}
}

func (h hasher) Verify(objectStr string, payload []byte) bool {
	parts := strings.Split(objectStr, ":")
	if len(parts) != 2 {
		return false
	}
	chosenAlgo := Algorithm(parts[0])
	hashFn, ok := hashers[chosenAlgo]
	if !ok {
		return false
	}

	expectedLen := len(chosenAlgo) + 1 + hex.EncodedLen(hashFn().Size())
	if expectedLen != len(objectStr) {
		return false
	}

	o := h.Hash(chosenAlgo, payload)
	return o.String() == objectStr
}

type Object interface {
	Algorithm() Algorithm // returns the algorithm used
	Bytes() []byte        // returns the raw hashed bytes
	String() string       // returns <algorithm>:<hex-encoded bytes>

	// Size returns the amount of bytes of the byte array
	Size() uint8
}

type object struct {
	algo Algorithm
	size uint8
	hash []byte
}

func (o object) Algorithm() Algorithm {
	return o.algo
}

func (o object) Size() uint8 {
	return o.size
}

func (o object) Bytes() []byte {
	a := make([]byte, len(o.hash), len(o.hash))
	copy(a, o.hash) // do NOT let anybody modify the underlying hash slice in any way
	return a
}

func (o object) String() string {
	return fmt.Sprintf("%s:%s", o.algo, hex.EncodeToString(o.hash))
}

func EqualObjects(a, b Object) bool {
	if a.Size() != b.Size() {
		return false
	}
	if a.Algorithm() != b.Algorithm() {
		return false
	}
	return a.String() == b.String()
}

func GenerateRandomBytes(numBytes int) ([]byte, error) {
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
