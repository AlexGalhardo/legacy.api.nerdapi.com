FROM oven/bun:latest
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]
