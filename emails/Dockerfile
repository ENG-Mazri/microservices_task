FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app
RUN apk --no-cache --update add python3 py3-pip alpine-sdk bash librdkafka openssl-dev

COPY package.json .

RUN npm install


COPY . .

EXPOSE 6666


CMD ["npm", "run", "dev"]