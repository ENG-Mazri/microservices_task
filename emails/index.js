const kafka = require('node-rdkafka')
const fs = require('fs')
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
    const email = data.value.toString()
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure:true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });
    
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Welcome to this app!',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      html: `<h1>Welcome to this app!</h1><br/><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
    
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        } 
    });
})