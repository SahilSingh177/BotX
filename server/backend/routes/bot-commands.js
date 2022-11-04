const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

const commandConntroller = require('../controllers/commandController');

router.post('/save-bot',[
    body('server_name').
    not().
    isEmpty()
    .withMessage("server name cannot be empty"),
    body('bot_name').
    not().
    isEmpty()
    .withMessage("bot name cannot be empty"),
    body('desc').
    not().
    isEmpty()
],
commandConntroller.saveBot
)

router.get('/get-bot',commandConntroller.getAllServers)

module.exports=router;