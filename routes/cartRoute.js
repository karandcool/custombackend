const { Router } = require("express");
const router = Router();
const CartController = require("../controller/cartController");
const verifyToken = require("../auth");
const upload = require("../helper/imageUpload");

// const model = require("./model")

router.get('/', verifyToken, CartController.getAll)
router.post('/', verifyToken, CartController.create)
router.post('/addCustomiseItem', verifyToken, upload.any(), CartController.addCustomiseItem)
router.post('/addItem', verifyToken, CartController.addItem)
router.post('/removeItem', verifyToken, CartController.removeItem)
router.post('/deleteItem', verifyToken, CartController.deleteItem)
router.delete('/', verifyToken, CartController.delete)


module.exports = router;