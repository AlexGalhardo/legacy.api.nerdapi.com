<div align="center">
 <h1 align="center"><a href="https://api.nerdapi.com/" target="_blank">api.nerdapi.com</a></h1>
</div>

## Introduction

* A personal project I created to learn [NestJS](https://nestjs.com/), Typescript, Clean/Hexagonal Architecture Principles (ports, useCases, repositories, etc) Stateless Authentication using JWT, as also improve my skills in API development and documentation, tests, and so on.
* This project use 2 databases:
  * JSONs files for simplicity and fast development.
  * PostgresSQL using PrismaORM (migrations, seeds, prisma studio) and Docker
* This API is hosted in: <https://render.com/>
* Payment API: <https://stripe.com/en-br>
* Emails API: <https://resend.com/>

## FrontEnd & Docs

* FrontEnd Source Code: <https://github.com/AlexGalhardo/nerdapi.com>
* Documentation Source code: <https://github.com/AlexGalhardo/docs.nerdapi.com>
* Docs Live: <https://docs.nerdapi.com>

## Development Setup Local

* Clone repository

<!---->

    git clone git@github.com:AlexGalhardo/api.nerdapi.com.git

* Enter repository

<!---->

    cd api.nerdapi.com/

* Install dependencies

<!---->

    npm install

* Setup your enviroment variables

<!---->

    cp .env-example .env

* If you want to use JSON Database
  * Set USE\_DATABASE\_JSON=true

<!---->

    cp .env-example .env

* Start local server

<!---->

    npm run dev

* Go to: <http://localhost:3000/>

## Build for deploy

* To created build to deploy run:

<!---->

    npm run build

* To test build production locally run:

<!---->

    npm run start

## Tests

* Verify useCases tests:

<!---->

    npm run test

* Verify End to End tests:

<!---->

    npm run test:e2e

![print-tests-api-nerdapi](https://github.com/AlexGalhardo/api.nerdapi.com/assets/19540357/c9fe9b9a-2a17-4612-bb85-3ab06d1467bc)

## Before Submit Commits & PRs

* Run command:

<!---->

    npm run format

<!---->

## HTTP Requests

* You can see the HTTP Requests references inside folder **rest-client/**

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
