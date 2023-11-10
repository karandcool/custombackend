const { Router } = require("express");
const userController = require("../controller/userController")
const router = Router();
const auth = require( '../auth' );
// const model = require("./model")

router.post('/signin',  userController.SignIn)
router.post('/',  userController.create)
// router.put('/', async (req,res) => {
//     res.send("hello")
// } )
// router.delete('/', async(req,res) => {
//     res.send("hello")
// } )


module.exports = router;