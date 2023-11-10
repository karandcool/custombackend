const { Router } = require("express");
const router = Router();
const OrderController = require("../controller/orderController");
const verifyToken = require("../auth");
const orderController = require("../controller/orderController");
// const upload = require("../helper/imageUpload");

// const model = require("./model")

router.get('/', verifyToken, OrderController.getAll)
router.post('/', verifyToken, OrderController.create)
router.post("/capture/:paymentId", verifyToken, OrderController.razorPay )
router.post("/razor", OrderController.razor)
// router.post('/addItem', verifyToken, OrderController.addItem)
// router.post('/removeItem', verifyToken, OrderController.removeItem)
// router.post('/deleteItem', verifyToken, OrderController.deleteItem)


module.exports = router;