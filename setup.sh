#!/bin/bash
docker stop $(docker ps -q) && docker rm $(docker ps -aq)
docker-compose down
docker-compose up -d
bun run prisma:generate
bun run prisma:migrate
bun run prisma:push
bun run prisma:seed
