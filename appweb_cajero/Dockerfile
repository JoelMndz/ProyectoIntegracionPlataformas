FROM node:18.16.0-alpine as build
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install

# FROM nginx:1.23.4
# WORKDIR /usr/share/nginx/html
# COPY --from=build /app/dist .
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

CMD [ "npm", "run","dev" ]