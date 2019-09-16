### Turing API

[![Build Status](https://travis-ci.com/reiosantos/turing-api.svg?token=E6xehCrKWn7FT5taBNM4&branch=staging)](https://travis-ci.com/reiosantos/turing-api)
### Setup

#### Install

```bash
git clone https://github.com/reiosantos/turing-api.git

cd turing-api
```

Set the environment variables needed to run the application, A sample **.env.sample** file 
contains all the variables that should be defined.
 
These variables must be set before starting the app:

```bash
STRIPE_SECRET_KEY
MAILGUN_API_KEY
MAILGUN_DOMAIN
```

#### Prepare and run on development without docker

```bash
npm install
npm run start:dev
```

#### start the api using docker

```bash
docker build -t turing-api .
docker run -p 5000:5000 -e STRIPE_SECRET_KEY=somekey -e MAILGUN_API_KEY=getthisfrommailgun -e MAILGUN_DOMAIN=anotheronefrommailgun turing-api
```

or using the env file
```bash
docker run -p 5000:5000 --env-file .env turing-api
```

Access the api on
```http request
http://localhost:5000/api
``` 

The API Documentation can be found at **http://localhost:5000/api/docs** 
