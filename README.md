<div align="center">
 <h1 align="center"><a href="https://api.nerdapi.com/" target="_blank">api.nerdapi.com</a></h1>
</div>

<https://github.com/AlexGalhardo/api.nerdapi.com/assets/19540357/a2d8b8a2-d170-4a28-8f53-fdde6236b425>

## Introduction

* A personal project I created to learn and improve my skills in:
  * [NestJS](https://nestjs.com/)
  * Typescript
  * Clean/Hexagonal Architecture Principles (ports, useCases, repositories, etc)
  * Stateless Authentication & Authorization using JWT
  * API (REST) development and documentation
  * Tests (Unit, integration, TDD, etc)
  * Web Scrapping
  * API Requests Handling & Limit & Quota
  * SaaS (Software as a Service) Backend Development
  * And so on
* This project use 2 databases:
  * JSONs files for simplicity and fast development.
  * PostgresSQL using PrismaORM (migrations, seeds, prisma studio) and Docker

## Technologies and Tools Used
* [Git](https://git-scm.com/)
* [NodeJS v20](https://nodejs.org/en)
* [VSCode](https://code.visualstudio.com/)
* [Prisma ORM](https://www.prisma.io/)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)
* Telegram API for Logs: <https://core.telegram.org/api>
* Deploy: <https://render.com/>
* Payment API: <https://stripe.com/en-br>
* Emails API: <https://resend.com/>

## Features

* \[x] GitHub Actions for CI/CD
* \[x] Linter and Prettier to format code
* \[x] Unit Tests using mocks
* \[x] Integration Tests
* \[x] Swagger API Documentation
* \[x] Authentication, Authorization and Google & Github Social Login

## FrontEnd & Docs

* FrontEnd Source Code: <https://github.com/AlexGalhardo/nerdapi.com>
* Documentation Source code: <https://github.com/AlexGalhardo/docs.nerdapi.com>
* Docs Live: <https://docs.nerdapi.com>

## Development Setup Local

* Clone repository

<!---->

```
git clone git@github.com:AlexGalhardo/api.nerdapi.com.git
```

* Enter repository

<!---->

```
cd api.nerdapi.com/
```

* Install dependencies

<!---->

```
npm install
```

* Setup your enviroment variables

<!---->

```
cp .env-example .env
```

* Start Docker, PrismaORM, Migrations and Seeds

<!---->

```
sh setup.sh
```

* To Start Prisma Studio:

<!---->

```
npm run prisma:studio
```

* Start local server

<!---->

```
npm run dev
```

* Go to: <http://localhost:4000/>

## Build for deploy

* To created build to deploy run:

<!---->

```
npm run build
```

* To test build production locally run:

<!---->

```
npm run start
```

## Tests

* Run unit tests:

<!---->

```
npm run test
```

* Run integrations tests:

<!---->

```
npm run test:integration
```

## API

* You can see the HTTP Requests references inside folder **rest-client/**

* You can also import file `docs/INSOMNIA_API_NERDAPI_HTTP_REQUESTS_COLLECTION.json` to your Insomnia HTTP Client

* You can also see Swagger API documentation in: <http://localhost:4000/api>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
