const kafka = require('node-rdkafka')
const nodemailer = require('nodemailer')
require('dotenv').config()

const consumer = kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list':'localhost:9092'},
    {})
consumer.connect()

consumer.on('ready', ()=>{
    consumer.subscribe(['email'])
    consumer.consume()
}).on('data', data=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure:true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });
    
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: data.email,
      subject: 'Sending Email from the email service',
      text: 'Hello there'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }   
    });
})