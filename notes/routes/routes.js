const express = require('express')
const router = express.Router();


const Note = require('../controllers/notes')



router.post('/', Note.create)
router.get('/', Note.findAll)
router.get('/allpublishednotes', Note.findAllPublished )
router.get('/:id', Note.findOne)
router.put('/:id', Note.update)
router.delete('/:id', Note.delete)
router.delete('/', Note.deleteAll)

// router.post('/test', async (req,res)=>{
//     const cookie = req.headers.cookie
//     if(cookie){
//         const token = cookie.split('=')[1]
//         const decoded = jwt.decode(token, {complete: true}) ;
//         const payload = decoded.payload ;
//         const email = payload.email
//         const id = user.id
//         res.send(id)
//     }else{
//         res.send("no jwt")
//     }
// })

module.exports = router