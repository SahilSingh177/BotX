const bot = require('../models/bot');
const { validationResult } = require('express-validator/check');

exports.saveBot=async (req,res,next)=>{
    
    const errors = validationResult(req);

    console.log(errors)

    if(errors){
        return res.send({"error":errors[0]});
    }
    
    try {
        const botDetails=req.body;
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
            previousBots.push({bot_name:botName,command:commands,desc:descript});
            newBot.bots=previousBots;
            newBot.save()
            .then(()=>{
                res.send(newBot);
            })
        }  
        console.log('success')
    } catch (error) {
        return res.send({"error":error});
    }

}

exports.getAllServers= async (req,res,next)=>{
    const response=await bot.find();
    res.send(JSON.stringify(response))
}