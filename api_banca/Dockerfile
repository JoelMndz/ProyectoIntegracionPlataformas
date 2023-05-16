FROM node:18.16.0-alpine as deps
WORKDIR /app
COPY package.json .
RUN npm install

FROM node:18.16.0-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18.13.0 as runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json .
RUN npm install

CMD [ "npm", "run","start" ]