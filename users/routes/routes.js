const express = require('express')
const router = express.Router();

const User = require('../controllers/users')
const login = require('../controllers/login')

router.post('/', User.create)
router.get('/', User.findAll)
router.get('/:id', User.findOne)
router.put('/:id', User.update)
router.delete('/:id', User.delete)
router.delete('/', User.deleteAll)
router.post('/login', login.login)


// router.post('/kafka', (req,res)=>{

//     const {name} = req.body
//     const stream = kafka.createWriteStream({'metadata.broker.list':'localhost:9092'},
//                     {},{topic:'email'})

//     const queueMessage = ()=>{
//         const success = stream.write(Buffer.from(name, 'utf-8'))
//         if(success){
//             console.log('message wrote successfully :)')
//         }else{
//             console.log('couldn\'t write message :(')
//         }
//     }
//     queueMessage()
//     res.send('message sent')
// })


module.exports = router