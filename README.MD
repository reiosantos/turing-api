### Turing API

[![Build Status](https://travis-ci.com/reiosantos/turing-api.svg?token=E6xehCrKWn7FT5taBNM4&branch=staging)](https://travis-ci.com/reiosantos/turing-api)
### Setup

#### Install

```bash
git clone https://github.com/reiosantos/turing-api.git

cd https://github.com/reiosantos/turing-api.git

```

Set the environment variables needed to run the application, A sample **.env.sample** file 
contains all the variables that should be defined.
 
#### Prepare the server

```bash
npm install
npm run db:rollmigrate
```

#### start server

```bash
npm run start:dev
```

Access the api on
```http request
http://localhost:5000/api
``` 

The API Documentation can be found at **http://localhost:5000/api/docs/** 
