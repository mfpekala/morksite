
build:
	docker build -t personal-postgres ./

run:
	docker run -d --name personal-postgres-container -p 5432:5432 personal-postgres

exec:
	docker exec -it personal-postgres-container bash
