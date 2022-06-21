# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# syntax=docker/dockerfile:1

FROM node:14.17.4 as build-stage
ENV NODE_ENV=production

WORKDIR /app
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21.4
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf