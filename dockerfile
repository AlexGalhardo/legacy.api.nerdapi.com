FROM node:20-alpine as build

RUN apk update && apk add bash
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force

COPY . .

RUN npm run build 

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]