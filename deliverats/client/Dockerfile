FROM node:19.9-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
