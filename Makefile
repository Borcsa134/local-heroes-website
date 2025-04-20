.PHONY: start start-db stop build install sh logs test restart config lint db 

# \
!ifndef 0 # \
wait_for_input=pause # \
!else
wait_for_input=read
# \
!endif

container=lh-frontend

# start all the containers
start:
	docker compose up -d

# start the db only
start-db:
	docker compose up -d postgres

# stop all the containers
stop:
	docker compose down

# restart containers
restart: stop start

# build the app container
build:
	docker compose build

# install npm packages
install:
	docker compose run --rm $(container) npm install

# get a shell within the app container
sh:
	docker compose exec $(container) /bin/sh

# run tests
test:
	docker compose exec $(container) npm run test

# run linter
lint:
	docker compose exec $(container) npm run lint

# connect to db
db:
	docker compose exec postgres psql -h postgres -p 5432 -U pguser -d lhdb

# migrate db
migrate:
	docker compose exec $(container) npx prisma migrate dev

# check console output
logs:
	docker compose logs -f

# show the combined compose file used
config:
	docker compose config

promote:
	echo "Make sure master/production branch is up-to-date! And what you are about to deploy is already on staging! Hit [ENTER] to continue"
	$(wait_for_input)
	git checkout production
	git rebase main
	git push
	git checkout main
