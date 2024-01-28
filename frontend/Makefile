init:
	# nvm install 21.2.0
	npm install
	npm install -g serve


serve:
	npm start


serve_prod:
	npm run build && serve -s build


build_dev:
	docker build -t app-frontend:dev .

serve_dev:
	docker run -p 3000:3000 -d app-frontend:dev

build_push_prod:
	docker build -t app-frontend:prod .
	docker tag app-frontend:prod mightycontainer/app-frontend-prod
	docker push mightycontainer/app-frontend-prod