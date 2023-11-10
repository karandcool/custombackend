// const connection = require("../database");
const jwt = require("jsonwebtoken")
const Address = require("../model/address");
const secretKey = "secretKey"
class AddressController {

    async create( req, res, next ) {
        try {
            const data = await Address.create(req.body);
            res.send(`Address Created ${data}`)
            
        } catch ( e ) {
            next( e );
        }
    }
    async getAll( req, res, next ) {
        try {
            const AddressData = await Address.getAll();
            res.send(AddressData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async delete (req,res,next) {

    }
    async update(req,res,next) {

    }
}

module.exports = new AddressController;