let router = require('express').Router();
const verify = require('./verifies');

router.get('/',verify,(req,res)=>{
    res.send("Here is the data");
});

module.exports = router;