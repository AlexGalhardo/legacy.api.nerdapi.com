FROM oven/bun:latest
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
COPY . .
RUN bun install
EXPOSE 3000
ENTRYPOINT ["bun", "run", "dev"]
