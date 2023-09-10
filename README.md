<div align="center">
 <h1 align="center"><a href="https://nerdapi.com/" target="_blank">api.nerdapi.com</a></h1>
</div>

## Introduction

*   A personal project I created to learn [NestJS](https://nestjs.com/) with Typescript, Clean/Hexagonal Architecture Principles (ports, useCases, repositories, etc) and Stateless Authentication using JWT and localStorage, as also improve my skills in product development, API development and documentation, SEO, tests, and so on.
*   This project saves data to JSONs files for simplicity and fast development.
*   This API is hosted in: <https://render.com/>
*   Payment API: <https://stripe.com/en-br>
*   Emails API: <https://resend.com/>

## Development Setup Local

*   Clone repository

<!---->

    git clone git@github.com:AlexGalhardo/api.nerdapi.com.git

*   Enter repository

<!---->

    cd api.nerdapi.com/

*   Install dependencies

<!---->

    npm install

*   Setup your enviroment variables

<!---->

    cp .env-example .env

*   Start local server

<!---->

    npm run dev

*   Go to: <http://localhost:3000/>

## Build for deploy

*   To created build to deploy run:

<!---->

    npm run build

*   To test build production locally run:

<!---->

    npm run start

## Tests

*   Verify useCases tests:

<!---->

    npm run test

*   Verify End to End tests:

<!---->

    npm run test:e2e

![print-tests-api-nerdapi](https://github.com/AlexGalhardo/api.nerdapi.com/assets/19540357/579da8f3-572c-4042-96f5-fb7a7469ca7b)

## Before Submit Commits & PRs

*   Run command:

<!---->

    npm run format

<!---->

## Insomnia HTTP Requests

*   You can import file: <b>INSOMNIA-API-NERDAPI-HTTP-REQUESTS.json</b>
*   To your [https://insomnia.rest/](Insomnia) Http Client

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
