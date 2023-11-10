// const connection = require("../database");
const jwt = require("jsonwebtoken")
const Order = require("../model/order");
const secretKey = "secretKey"
const Razorpay = require("razorpay");
var request = require("request");
const Cart = require("../model/cart");
const Address = require("../model/address");
// const { request } = require("express");
const instance = new Razorpay({
    key_id: "rzp_test_0vDZwn2F8aArez",
    key_secret: "EbuhOf52tD1iOB3uWGBcKH2m",
});
// const https = require('https');
// /*
// * import checksum generation utility
// * You can get this utility from https://developer.paytm.com/docs/checksum/
// */
// const PaytmChecksum = require('./PaytmChecksum');

// var paytmParams = {};

// paytmParams.body = {
//     "requestType"   : "Payment",
//     "mid"           : "YOUR_MID_HERE",
//     "websiteName"   : "YOUR_WEBSITE_NAME",
//     "orderId"       : "ORDERID_98765",
//     "callbackUrl"   : "https://<callback URL to be used by merchant>",
//     "txnAmount"     : {
//         "value"     : "1.00",
//         "currency"  : "INR",
//     },
//     "userInfo"      : {
//         "custId"    : "CUST_001",
//     },
// };

// /*
// * Generate checksum by parameters we have in body
// * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
// */
// PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "YOUR_MERCHANT_KEY").then(function(checksum){

//     paytmParams.head = {
//         "signature"    : checksum
//     };

//     var post_data = JSON.stringify(paytmParams);

//     var options = {

//         /* for Staging */
//         hostname: 'securegw-stage.paytm.in',

//         /* for Production */
//         // hostname: 'securegw.paytm.in',

//         port: 443,
//         path: '/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': post_data.length
//         }
//     };

//     var response = "";
//     var post_req = https.request(options, function(post_res) {
//         post_res.on('data', function (chunk) {
//             response += chunk;
//         });

//         post_res.on('end', function(){
//             ('Response: ', response);
//         });
//     });

//     post_req.write(post_data);
//     post_req.end();
// });

class OrderController {

    

    async create( req, res, next ) {
        try {
            const data = await Order.create(req.body);
            if(data) {
                res.send({
                    orderStatus: 500,
                    message: data})
            }
            
            
        } catch ( e ) {
            next( e );
        }
    }
    async getAll( req, res, next ) {
        try {
            
            const OrderData = await Order.find(req?.query);
            res.send(OrderData)
         
        } catch ( e ) {
            next( e );
        }
    }
    async razorPay ( req,res,next) {
        
            return request(
             {
             method: "POST",
             url: `https://"rzp_test_0vDZwn2F8aArez":EbuhOf52tD1iOB3uWGBcKH2m@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
             form: {
                amount: req.body.amount, // amount == Rs 10 // Same As Order amount
                currency: "INR",
              },
            },
           async function (err, response, body) {
             if (err) {
              return res.status(500).json({
                 message: "Something Went Wrong",
               }); 
             }
             req.body.orderData.razorpay_order_id= req.body.razorpay_order_id,
             req.body.orderData.razorpay_payment_id= req.body.razorpay_payment_id,
             req.body.orderData.razorpay_signature=req.body.razorpay_signature
             req.body.orderData.mobileNumber=req.body.address.mobileNumber
             req.body.address.userId = req.user.user_id 
             const addressData = await Address.create(req.body.address)
             req.body.orderData.deliveryAddress = addressData._id
             const data = await Order.create(req.body.orderData);
            if(data) {
              await Cart.findOneAndDelete({user: req.user.user_id})
                res.send({
                    orderStatus: 200,
                    message: data})
            }
              // ("Status:", response.statusCode);
              // ("Headers:", JSON.stringify(response.headers));
              // ("Response:", body);
              // return res.status(200).json(body);
            });
          
    }
    async razor (req, res, next) {
             
              const options = {
                amount: req.body.amount * 100, // amount == Rs 10
                currency: "INR",
                receipt: "receipt#1",
                payment_capture: 0,
           // 1 for automatic capture // 0 for manual capture
              };
            instance.orders.create(options, async function (err, order) {
              if (err) {
               
                return res.status(500).json({
                  message: "Something Went Wrong",
                });
              }
              
            return res.status(200).json(order);
           });
          
          
    }
    async delete (req,res,next) {

    }
    async update(req,res,next) {

    }
}

module.exports = new OrderController;