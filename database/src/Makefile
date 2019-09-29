export GO111MODULE := off

DBNAME:=treasure_app
DBNAME_TEST:=treasure_app_test
DATASOURCE:=root:password@tcp(127.0.0.1:3306)/$(DBNAME)
DATASOURCE_TEST:=root:password@tcp(127.0.0.1:3306)/$(DBNAME_TEST)

install:
	which goose || GO111MODULE=off go get -u github.com/pressly/goose/cmd/goose

docker-compose/up:
	docker-compose up -d

docker-compose/down:
	docker-compose down

mysql:
	mysql -u root -h localhost --protocol tcp -p $(DBNAME)

migrate/init:
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p
	# mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME_TEST)\`" -p

migrate/status:
	@goose -dir migrations mysql "$(DATASOURCE)" status

migrate/up:
	@goose -dir migrations mysql "$(DATASOURCE)" up
	# @goose -dir migrations mysql "$(DATASOURCE_TEST)" up

__migrate/down:
	@goose -dir migrations mysql "$(DATASOURCE)" down
	# @goose -dir migrations mysql "$(DATASOURCE_TEST)" down

init: install docker-compose/up migrate/init migrate/up
