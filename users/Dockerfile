FROM node:17-alpine

WORKDIR /users

COPY . .

RUN npm install

EXPOSE 3333


CMD ["node", "server.js"]