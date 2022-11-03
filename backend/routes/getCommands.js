const express = require('express');
const router = express.Router();
const bot=require('../models/bot')

router.post('/save-bot',async (req,res,next)=>{
    const botDetails=req.body;
    console.log(botDetails);
    console.log(typeof(req.body))
    const botName=botDetails.bot_name;
    const serverName=botDetails.server_name;
    const commands=botDetails.command;
    const descript=botDetails.desc;

    let newBot=await bot.findOne({name:serverName});
    if(!newBot){
        newBot=new bot({name:serverName,bots:[{bot_name:botName,command:commands,desc:descript}]});
        newBot.save()
        .then(()=>{
            res.send(newBot);
        })
    }
    else{
        const previousBots=newBot.bots;
        previousBots.push({bot_name:serverName,command:commands,desc:descript});
        newBot.bots=previousBots;
        newBot.save()
        .then(()=>{
            res.send(newBot);
        })
    }

})

router.get('/get-bot',async (req,res,next)=>{
    const resu=await bot.find({});
    const response=resu[0];
    console.log(response)
    res.send(JSON.stringify(response))
})

module.exports=router;