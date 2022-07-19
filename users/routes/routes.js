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

module.exports = router