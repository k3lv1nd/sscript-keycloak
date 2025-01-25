# Scratch & Script Keycloak Authentication App Example

This app is built using the following technologies
- API -> Django & Djangorestframework, PostgreSQL & MongoDB
- FE -> React bootstrapped with Create React App and Bootstrap for styling
- Keycloak Authentication


## Installation and set-up

In the project directory, you can run:

### `docker-compose up --build` 

Spins up all the services required to run the app as mentioned above
Ensure that ports 8000, 8080, 5432, 27017 & 3000 are available in your machine or adjust accordingly 
## Databse Migrations
Proceed to apply the database migrations by running:
### `docker exec -it {api_container_id} bash` 
### `python ./scratchandscript/manage.py migrate` 

## Keycloak set-up
The Keycloak service should be running on [http://localhost:8080](http://localhost:8080) 
Navigate to this link and login to the admin console with credentials username: admin password: admin

Import the realm from file realm-export.json found in the root directory of this project

Open [http://localhost:3000](http://localhost:3000) to view and test the app.

