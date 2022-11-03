const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const botSchema = new Schema({
        name:{
            type:String,
            required:true
        },
        bots:[
            {
                bot_name:{
                    type:String,
                    required:true
                }, 
                command:[{type:String}],
                desc:[{type:String}]
            }

        ]
    },
);

module.exports=mongoose.model('bot',botSchema);