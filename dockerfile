#! dependencias iniciales
FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

#! contruye la aplicacion con las dependencias en cache 
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

#! imagen de producción
FROM node:18-alpine3.15 AS runner

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn install --prod

COPY --from=builder /app/dist ./dist
COPY public ./public
EXPOSE 3000

CMD [ "node","dist/main" ]