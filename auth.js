/* eslint-disable */
const jwt = require( 'jsonwebtoken' );

const config = 'secretkey';

const verifyToken = ( req, res, next ) => {
  // (req.body, req.headers)
  const tokensep = req.headers.token.split( ' ')
  // (tokensep[1])
    const token = req.body.token || req.query.token || tokensep[1];

    if ( !token ) {
        return res.status( 403 ).send( 'A token is required for authentication' );
    }
    try {
      (token)
        const decoded = jwt.verify( token, 'secretKey' );

        (decoded, "kjshajshasjah")

        req.user = decoded;
    }
    catch ( err ) {
        return res.status( 401 ).send( 'Invalid Token' );
    }
    return next();
};

module.exports = verifyToken;
