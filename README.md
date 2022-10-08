# FWD store backend API

## Project overview

an API end points for users,products and orders

## Built with
- Node.js
- express
- TypeScript
- Jasmine
- Supertest
- jasmine spec reporter
- PostgreSQL

## Project setup
- clone the GitHub repo
`git clone https://github.com/M-Massoud/FWD-store-backend-API.git`
- install all dependencies 
`npm install `
- run the server
`npm run start`
- run the database migration 
`db-migrate up`
- run tests
`npm run test`
- linting and formating
`npm run lint`
`npm run prettier`

## ports
The application runs on port `3002` and database on `5432`.


## .env sample
```
PORT= 3002
ENV = dev
PGHOST = 'localhost'
PGUSER = <add your postgress user name>
PGDATABASE_DEV = fwd_store_dev
PGDATABASE_TEST = fwd_store_test
PGPASSWORD = <add your password>
PGPORT = 5432
SALT_ROUNDS= 9
TOKEN_SERCRET = <secret token>
```
create two databases one for the dev and one for testing 
```
CREATE DATABASE fwd_store_dev;
CREATE DATABASE fwd_store_test;
```

## Endpoints
check the requirments.md file
