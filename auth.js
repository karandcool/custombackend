/* eslint-disable */
const jwt = require( 'jsonwebtoken' );

const config = 'secretkey';

const verifyToken = ( req, res, next ) => {
  console.log(req.body, req.headers)
  const tokensep = req.headers.token.split( ' ')
  console.log(tokensep[1])
    const token = req.body.token || req.query.token || tokensep[1];

    if ( !token ) {
        return res.status( 403 ).send( 'A token is required for authentication' );
    }
    try {
      console.log(token)
        const decoded = jwt.verify( token, 'secretKey' );

        console.log(decoded, "kjshajshasjah")

        req.user = decoded;
    }
    catch ( err ) {
        return res.status( 401 ).send( 'Invalid Token' );
    }
    return next();
};

module.exports = verifyToken;
