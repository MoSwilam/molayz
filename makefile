# NCC output path
DIST_DIR = dist
DIST_DB = database
DIST_NM = node_modules

# Launch Chrome with given URL from command line
alias_url='open -a "Google Chrome.app"'

start:: browser
browser:
	open -a 'Google Chrome.app'  "http://localhost:3000"

start:: api

dev:
	npm run start:dev

prd:
	make build
	npm run start:prd

# Install and Run
install:
	make clean
	npm install

api:
	npm run start

build:
	npm run prebuild --if-present
	npm run build --if-present

clean:
	rm -fr $(DIST_DIR)
	rm -fr $(DIST_DB)
	rm -fr $(DIST_NM)

# Docker
d-build:
	make build-pipeline
	@echo "Generating docker image..."
	docker build -t relayz/api:1.0.0 .

d-run:
	@echo "Running api..."
	run -d -p 8080:c relayz/api:1.0.0

dc-up:
	@echo "Running all images"
	@docker-compose up -d

dc-down:
	docker-compose down
