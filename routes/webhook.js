const express = require('express');
const router = express.Router();
const webhookController = require('../controller/middleware/webhook');

router.post('/webhook', express.raw({ type: 'application/json' }), webhookController.handleWebhook);

module.exports = router;