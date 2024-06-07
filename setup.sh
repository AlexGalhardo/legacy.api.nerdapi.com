#!/bin/bash
docker stop $(docker ps -q) && docker rm $(docker ps -aq)
docker-compose down
docker-compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run prisma:push
npm run prisma:seed
