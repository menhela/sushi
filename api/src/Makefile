export GO111MODULE := on

GOOS := linux
GOARCH := amd64

init: .env

.env:
	cp $@.example $@

go:
	gofmt -s -w .

run:
	go run cmd/api/main.go

build:
	CGO_ENABLED=0 GOOS=$(GOOS) GOARCH=$(GOARCH) go build -o main -ldflags '-extldflags "-static"' cmd/api/main.go

test:
	go test -v ./...

dev-deps:
	GO111MODULE=off go get -u -v \
		github.com/oxequa/realize

refresh-run:
	realize start
