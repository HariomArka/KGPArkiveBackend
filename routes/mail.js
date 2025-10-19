const express = require('express');
const router = express.Router();
const { sendMail } = require('../controllers/mailController');

router.post('/contact', sendMail);

module.exports = router;
