# Dependencies

FROM node:20-alpine AS dependencies
WORKDIR /files

COPY package.json package-lock.json ./

RUN npm install

# Build

FROM node:20-alpine AS builder
WORKDIR /files

COPY . .

COPY --from=dependencies /files/node_modules ./node_modules

RUN npm run build

# Final Image

FROM busybox:latest

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=builder /files/dist .

CMD ["busybox", "httpd", "-f", "-v", "-p", "80"]