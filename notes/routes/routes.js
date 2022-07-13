const express = require('express')
const router = express.Router();

const Note = require('../controllers/notes')


router.post('/', Note.create)
router.get('/', Note.findAll)
router.get('/:id', Note.findOne)
router.put('/:id', Note.update)
router.delete('/:id', Note.delete)
router.delete('/', Note.deleteAll)

module.exports = router