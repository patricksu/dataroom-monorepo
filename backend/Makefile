init:
	pip install --upgrade pip
	pip install -r requirements.txt
	mkdir -p uploads


serve:
	lsof -i:8000 | grep "Python" | awk '{print $$2}' | xargs -I f kill -9 f

	ulimit -n 10240  # This is the max ulimit on macOS.

	gunicorn --bind 127.0.0.1:8000 --workers 1 --threads 8 --timeout 0 --reload app:app

clean:
	lsof -i:8000 | grep "Python" | awk '{print $$2}' | xargs -I f kill -9 f

serve_prod:
	# Run the web service on container startup.
	# Here we use the gunicorn webserver, with one worker process and 8 threads.
	# For environments with multiple CPU cores, increase the number of workers to be equal to the cores available.
	# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
	gunicorn --bind :$$PORT --workers 2 --threads 8 --timeout 0 --keep-alive 2000 app:app

build_dev:
	docker build -t app-backend:dev .

serve_dev:
	docker run -p 8000:8000 -d app-backend:dev

build_push_prod:
	docker build -t app-backend:prod .
	docker tag app-backend:prod mightycontainer/app-backend-prod:01-29-2024
	docker push mightycontainer/app-backend-prod:01-29-2024
