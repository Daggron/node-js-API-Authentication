const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){

    const token = req.header('auth-token');

    if(!token){
        return res.status(401).send('Access Denied');
    }

    try{
        const TOKEN_SECRET = process.env.TOKEN_SECRET || 'dhhdiqidpwaodpaskdascmzbxjfvshda';
        const verify = jwt.verify(token,TOKEN_SECRET);
        req.user = verify;
        next();
    }
    catch{
        res.status(401).send('Invalid Token');
    }

}