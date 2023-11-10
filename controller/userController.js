// const connection = require("../database");
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const bcrypt = require( 'bcrypt' );
const secretKey = "secretKey"
class userController {

    async create( req, res, next ) {
        try {
            console.log(req.body)
            let checkEmail = await User.findOne({email: req.body.email})
            console.log(checkEmail)
            if(checkEmail) {
                res.send({
                    'status': 500,
                    "message": "email already exists"})
            }else {
                    const saltRounds = 10;
            const hashedPwd = await bcrypt.hash( req.body.password, saltRounds );
            req.body.password = hashedPwd

            let response = await User.create( req.body)

            res.send({
                status: '200',
                user: `User Created ${response}`
            })
            }
            
        } catch ( e ) {
            next( e );
        }
    }
    async SignIn( req, res, next ) {
        try {
            console.log(req.body)
            const userdata = req.body
            
            let response = await User.findOne({"email" : userdata.email})
            console.log(response)
            console.log(req.body)
            if (response && (await bcrypt.compare( req.body.password, response.password ))) {
                // Create token
                const token = jwt.sign(
                  { user_id:  response._id , email:response.email },
                  secretKey,
                );
                await res.send({token: token});
              } else{
                await res.send({message: "incorrect email/password or email not exists"});
              }
            
            
            
         
        } catch ( e ) {
            next( e );
        }
    }
}

module.exports = new userController;