<div align="center">
 <h1 align="center"><a href="https://api.nerdapi.com/" target="_blank">api.nerdapi.com</a></h1>
</div>

<https://github.com/AlexGalhardo/api.nerdapi.com/assets/19540357/a2d8b8a2-d170-4a28-8f53-fdde6236b425>

## Introduction

- A personal project I created to learn and improve my skills in:
   - Clean/Hexagonal Architecture Principles (ports, useCases, repositories, etc)
   - Stateless Authentication & Authorization using JWT
   - API (REST) development and documentation
   - Tests (Unit, integration, TDD, etc)
   - Web Scrapping
   - API Requests Handling & Limit & Quota
   - SaaS (Software as a Service) Backend Development
   - And so on
- This project use 2 databases:
   - JSONs files for simplicity and fast development.
   - PostgresSQL using PrismaORM (migrations, seeds, prisma studio) and Docker

## Tools & Features
- [NodeJS v22](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nodejs.org/en)
- [VSCode](https://code.visualstudio.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Telegram API for Logs](https://core.telegram.org/api)
- Deploy: <https://render.com/>
- Payments: <https://stripe.com/en-br>
- Emails: <https://resend.com/>

## ToDo

- [x] GitHub Actions for CI/CD
- [x] Unit Tests using mocks
- [x] Integration Tests
- [x] Swagger API Documentation

## FrontEnd & Docs

= FrontEnd Source Code: <https://github.com/AlexGalhardo/nerdapi.com>
= Documentation Source code: <https://github.com/AlexGalhardo/docs.nerdapi.com>
= Docs Live: <https://docs.nerdapi.com>

## Development Setup Local

1. Clone repository
```bash
git clone git@github.com:AlexGalhardo/api.nerdapi.com.git
```

2. Enter repository
```bash
cd api.nerdapi.com/
```

3. Install dependencies
```bash
npm install
```

4. Setup your environment variables
```bash
cp .env.example .env
```

5. Create Migrations and Seeds
```bash
chmod +x setup.sh && ./setup.sh
```

6. To Start Prisma Studio:
```bash
npm run prisma:studio
```

7. Start local server
```bash
npm run dev
```

## Build
a. Creating build
```bash
npm run build
```

b. Testing build server locally
```bash
npm run start
```

## Tests

a. Run all tests
```bash
npm run test
```

b. Run integrations tests
```bash
npm run test:integration
```

## API Requests

- You can see the HTTP Requests references inside folder **rest-client/**
- You can also see Swagger API documentation in: <http://localhost:3000/api>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
