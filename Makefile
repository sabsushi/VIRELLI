build:
	docker compose up --build -d

down:
	docker compose down

clean:
	docker compose down -v
	docker system prune -f

logs:
	docker compose logs -f