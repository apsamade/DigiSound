const express = require('express');
const router = express.Router();
const webhookController = require('../controller/middleware/webhook');

router.post('/webhook', webhookController.handleWebhook);

module.exports = router;