// const connection = require("../database");
const jwt = require("jsonwebtoken")
const Items = require("../model/items");
const secretKey = "secretKey"
class ItemsController {

    async create( req, res, next ) {
        try {
            (req.body)
            req.body.picture = req.file.path

            const data = await Items.create(req.body);
            res.send(`Items Created ${data}`)
            
        } catch ( e ) {
            next( e );
        }
    }
    async getAll( req, res, next ) {
        try {
            const ItemsData = await Items.find({'active' : 'true'});
            res.send(ItemsData)
         
        } catch ( e ) {
            next( e );
        }
    }

    

    async getItemsByCategory(req,res,next) {
        try {
            // (req)
            const ItemsData = await Items.find({'categoryId': req.query.category, 'active' : 'true', customiseAvailable: 'false',});
            res.send(ItemsData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async getCustomiseItems(req,res,next) {
        try {
            // (req)
            const ItemsData = await Items.find({'active' : 'true', customiseAvailable: 'true',});
            res.send(ItemsData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async getItemById(req,res,next) {
        try {
            (req)
            const ItemsData = await Items.findById({'_id': req.query.id});
            res.send(ItemsData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async delete (req,res,next) {

    }
    async update(req,res,next) {

    }
}

module.exports = new ItemsController;