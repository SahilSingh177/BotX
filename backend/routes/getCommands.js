const express = require('express');
const router = express.Router();

router.post('/get-commands',(req,res,next)=>{
    console.log(req.body);
    console.log(typeof(res.body))
})

module.exports=router;