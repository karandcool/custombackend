// const connection = require("../database");
const jwt = require("jsonwebtoken")
const Category = require("../model/category");
const express = require("express");
const Item = require("../model/items");
const app = express();

app.get("/",(req,res)=>{
    res.render("index");
})

const secretKey = "secretKey"
class CategoryController {
    
    async create( req, res, next ) {
        // (req)
        try {
           
            req.body.picture = req.file.path
            const checkCategory = await Category.findOne({'name': req.body.name})
            if (checkCategory) {
                res.send('Category already exists')
            }else{
                const data = await Category.create(req.body);
            res.send(`Category Created ${data}`)
            }
            // res.redirect("/dashboard")
            
            
        } catch ( e ) {
            next( e );
        }
    }
    async getAll( req, res, next ) {
        try {
            const categoryData = await Category.aggregate(
                [
                    {
                      '$lookup': {
                        'from': 'items', 
                        'localField': '_id', 
                        'foreignField': 'categoryId', 
                        'as': 'result'
                      }
                    }, {
                      '$match': {
                        '$nor': [
                          {
                            'result': {
                              '$exists': false
                            }
                          }, {
                            'result': {
                              '$size': 0
                            }
                          }
                        ]
                      }
                    }
                  ]
            )
            let newData = [] 
            await categoryData.map((cat) => {
             
              if(cat?.result?.length === 1 && cat?.result[0]?.customiseAvailable === true) {
                
              } else{
                newData.push(cat)
              }
            })            
            res.send({categoryData: newData})
         
        } catch ( e ) {
            next( e );
        }
    }
    async delete (req,res,next) {

    }
    async update(req,res,next) {

    }
}

module.exports = new CategoryController;