const { Router } = require("express");
const CategoryController = require("../controller/categroyController")
const router = Router();
const upload = require("../helper/imageUpload")
// const model = require("./model")

router.get('/',  CategoryController.getAll)
router.post('/', upload.single('image'), CategoryController.create)
router.put('/',  CategoryController.update)
router.delete('/',  CategoryController.delete)



module.exports = router;