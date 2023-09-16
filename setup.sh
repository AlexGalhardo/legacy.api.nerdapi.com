#!/bin/bash
docker-compose down
docker-compose rm -rf postgres_nerdapi
docker volume rm postgres_nerdapi
docker-compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run prisma:push
npm run prisma:seed
