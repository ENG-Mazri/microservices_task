FROM node:17-alpine

RUN npm i -g nodemon

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 6666


CMD ["npm", "run", "dev"]