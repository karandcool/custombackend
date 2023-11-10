const { Router } = require("express");
const router = Router();
// const model = require("./model")
const ItemController = require("../controller/itemController")
const upload = require("../helper/imageUpload");
const verifyToken = require("../auth");


router.get('/',  ItemController.getAll)
router.get('/category', ItemController.getItemsByCategory)
router.get('/getCustomiseItem', ItemController.getCustomiseItems)
router.get('/getById', ItemController.getItemById)
router.post('/', upload.single('image'), ItemController.create)
router.put('/',  ItemController.update)
router.delete('/',  ItemController.delete)


module.exports = router;