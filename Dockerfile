FROM node:lts-fermium
WORKDIR /app
COPY package.json /app/
RUN npm i
COPY ./ /app/
RUN npm run build
RUN npm i -g serve

CMD ["serve", "-s", "build"]
