// const connection = require("../database");
const jwt = require("jsonwebtoken")
const Cart = require("../model/cart");
const secretKey = "secretKey"
class CartController {

    async create( req, res, next ) {
        try {
            console.log(req.body)
            console.log(req.user)
            console.log(req.files)
            const CartData = await Cart.findOne({user: req?.user?.user_id});
            console.log(CartData)
            const data = {
                items: [],
                user: "",

            }
            req.body.map((item) => {
                data.items.push({item: item._id, qty: item.qty, selectedSize:item?.selectedSize, selectedColor: item?.selectedColor, customImage : item?.customImage, finalcustomiseImage: item?.finalcustomiseImage, selectedText: item?.selectedText, customisePrice: (item?.selectedText || item?.customImage ) ? item?.customisePrice : 0})
            })
            data.user = req.user.user_id ;
            if(CartData) {
                console.log(CartData)
                const updateCart = await Cart.updateOne({
                    _id : CartData._id
                }, {
                  $push: {
                      "items": data.items
                  }
                })
                res.send(`Cart Created ${updateCart}`)

                // console.log(CartData)
            } else{
                const insertData = await Cart.create(data);
            res.send(`Cart Created ${insertData}`)
            }
            
            
            
        } catch ( e ) {
            next( e );
        }
    }
    async getAll( req, res, next ) {
        try {
            const CartData = await Cart.findOne({user: req.user.user_id});
if(CartData) {
    res.send(CartData)
}      
res.send({
    message: "Nothing In The Cart"
})      
         
        } catch ( e ) {
            next( e );
        }
    }

    async addCustomiseItem(req,res,next) {
        const newData = JSON.parse(req.body.itemData)
        console.log(req.files)
        req?.files?.map((data) => {
            if(data.fieldname == 'customImage') {
                newData['customImage']['image'] = data?.path
            } else{
                newData['finalcustomiseImage'] = data?.path
            }
        })
        // console.log(newData)
        const CartData = await Cart.findOne({user: req?.user?.user_id});
            // console.log(CartData)
            const data = {
                items: [],
                user: "",

            }
           
            data.items.push({item: newData._id, qty: newData.qty, selectedSize:newData?.selectedSize, selectedColor: newData?.selectedColor, customImage : newData?.customImage, finalcustomiseImage: newData?.finalcustomiseImage, selectedText: newData?.selectedText, customisePrice: (newData?.selectedText || newData?.customImage ) ? newData?.customisePrice : 0, fontSize: newData?.fontSize,fontFamily: newData?.fontFamily})
            
            data.user = req.user.user_id ;
            if(CartData) {
                // console.log(CartData)
                const updateCart = await Cart.updateOne({
                    _id : CartData._id
                }, {
                  $push: {
                      "items": data.items
                  }
                })
                if(updateCart) {
                    res.send({
                        statusCode: 200,
                        message: updateCart})
                }
                

                // console.log(CartData)
            } else{
                const insertData = await Cart.create(data);
                if(insertData) {
                    res.send({statusCode: 200,
                        message: insertData})
                }
            
            }
       
        // await this.create()
    }

    async addItem(req,res,next) {
        console.log(req.body)
        // const cartData = await Cart.findOne({user: req.user.user_id})
        // res.send(cartData.items)
        const newData = await Cart.findOneAndUpdate({
            user : req?.user?.user_id
        },  {$inc: { [`items.${req?.body?.index}.qty`]: 1}})
        console.log(newData)
        res.send({
            message: "items Added"
        })
    }
    async deleteItem(req,res,next) {
        const getCartData = await Cart.findOne({user: req?.user?.user_id})
        console.log(getCartData.items.length)
        if(getCartData.items.length === 1 ) {
            const deleteCartOfUser = await Cart.deleteOne({ _id: getCartData?._id })
            console.log(deleteCartOfUser)
            res.send({
                "message": "Items Deleted "
            })

            
        } else{
        const newData = await Cart.updateOne({
            user : req?.user?.user_id
        },{$unset:{[`items.${req?.body?.index}`]:1}}
        )
        const deleteNullItem = await Cart.updateOne({
            user : req?.user?.user_id
        },{$pull:{"items":null}}
        )
        console.log(newData, "newData")
        console.log(deleteNullItem, 'deleteNullItem')
        res.send({
            message: "items Deleted"
        })
        }
        
    }
    async removeItem(req,res,next) {
        const newData = await Cart.findOneAndUpdate({
            user : req?.user?.user_id
        },  {$inc: { [`items.${req?.body?.index}.qty`]: -1}})

        return res.status(200).json({
            messsage: "Item Added"
          });
    }

    async getCartByCategory(req,res,next) {
        try {
            console.log(req)
            const CartData = await Cart.find({'categoryId': req.query.category, 'active' : 'true'});
            res.send(CartData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async getItemById(req,res,next) {
        try {
            console.log(req)
            const CartData = await Cart.findById({'_id': req.query.id});
            res.send(CartData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async delete (req,res,next) {
        try {
            console.log(req)
            const CartData = await Cart.deleteOne({'user':req.user.user_id});
            res.send({
                status: 500,
                message: "Item Delete Sucessfully"
            })
         
        } catch ( e ) {
            next( e );
        }

    }
    async update(req,res,next) {

    }
}

module.exports = new CartController;