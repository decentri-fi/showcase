FROM node:lts-fermium as build-stage
WORKDIR /app
COPY package.json /app/
RUN npm i
COPY ./ /app/
RUN npm run build

FROM nginx:1.21.4
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
