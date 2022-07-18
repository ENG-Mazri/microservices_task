# microservices_task

## Backend stack
![node.js](https://img.shields.io/badge/-node.js-404040?style=for-the-badge&logo=node.js)
![express.js](https://img.shields.io/badge/-express.js-404040?style=for-the-badge&logo=express)
![Postgresql](https://img.shields.io/badge/-Postgresql-404040?style=for-the-badge&logo=Postgresql)
![sequelize](https://img.shields.io/badge/-sequelize-404040?style=for-the-badge&logo=sequelize)
![kafka](https://img.shields.io/badge/-kafka-404040?style=for-the-badge&logo=apachekafka)

## Todos:
- [x] Build a gateway API
- [x] Build users CRUD
- [x] Add JWT authentication
- [x] Build notes CRUD
- [x] Create a Kafka producer
- [x] Create a Kafka consumer
- [x] Setup the email service
- [x] Setup Docker-compose file 

⚠️So far, messaging between users service and emails service works only when not served in a docker container, due to some issues with librdkafka transporter.
