let router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register',async (req,res)=>{

    req.check('email','Email is not valid').isEmail();
    req.check('password','Password should be greater than 5 characters').isLength({min:5});

    let errors = req.validationErrors();
   
    if(errors){
        res.status(400).send(errors.map(err=>(err.msg)));
    }
    else{

        let alreayExists = await User.findOne({email : req.body.email});

        if(alreayExists){
            return res.status(400).send('Email Already exists');
        }
        
        else{

        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password,salt);

        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = hash;
        try{

        
            await User.create(user,(err)=>{
                if (err) throw err;
                console.log('User created Successfully');
                res.send(user);
            });
        }
        catch{
            res.status(400).send('Error Creating user');
        }

        }
    }

});

router.post('/login',async (req,res)=>{

    req.check('email','Email is not valid').isEmail();
    req.check('password','Password must be 6 characters long').isLength({min:5});

    let errors = req.validationErrors();

    if(errors){
        return res.status(400).send(errors.map(error=>(error.msg)));
    }
    
    let user = await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send(`Email do not exist`);
    }

    let checkpass = await bcrypt.compare(req.body.password , user.password);

    if(!checkpass){
        return res.status(400).send('Password is Invalid');
    }

    const TOKEN_SECRET = process.env.TOKEN_SECRET || 'dhhdiqidpwaodpaskdascmzbxjfvshda';
    const token = jwt.sign({_id : user._id}, TOKEN_SECRET);

    res.header('auth-token',token).send(token);
    // res.send('Hurray You are now logged in');


});


module.exports = router;