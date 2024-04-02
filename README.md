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
  * Tests (Unit, e2e, TDD, etc)
  * Web Scrapping
  * API Requests Handling & Limit & Quota
  * SaaS (Software as a Service) Backend Development
  * And so on
* This project use 2 databases:
  * JSONs files for simplicity and fast development.
  * PostgresSQL using PrismaORM (migrations, seeds, prisma studio) and Docker

## Tools and Services Used

* [Linux Mint XFCE 21.04](https://linuxmint.com/)
* [Git for control version](https://git-scm.com/)
* [NodeJS v20](https://nodejs.org/en)
* Code Editor: [VSCode](https://code.visualstudio.com/)
* Google & Github Social Login
* HTTP Requests Client: <https://insomnia.rest/>
* Telegram API for Logs: <https://core.telegram.org/api>
* Deploy: <https://render.com/>
* Payment API: <https://stripe.com/en-br>
* Emails API: <https://resend.com/>

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

* Verify useCases tests:

<!---->

```
npm run test
```

* Verify End to End tests:

<!---->

```
npm run test:e2e
```


## API

* You can see the HTTP Requests references inside folder **rest-client/**

* You can also import file `docs/INSOMNIA_API_NERDAPI_HTTP_REQUESTS_COLLECTION.json` to your Insomnia HTTP Client


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
