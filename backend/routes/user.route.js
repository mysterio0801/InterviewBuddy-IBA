const express = require('express');
const router = express.Router();
const {getUserByEmail , getUsers} = require('../controllers/user.controller');

router.get('/getUserByEmail/:email' , getUserByEmail);
router.get('/getUsers' , getUsers)

module.exports = router;