start:
	docker-compose up -d

# Alias to start
run: start

stop:
	docker-compose stop

deploy: start
	docker-compose -f docker-compose.gulp.yml run --rm gulp


