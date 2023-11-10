const { Router } = require("express");
const router = Router();
// const model = require("./model")

router.get('/', async (req,res) => {
    res.send("hello")
} )
router.post('/',  async (req, res)  => {
    res.send("hello")
} )
router.put('/', async (req,res) => {
    res.send("hello")
} )
router.delete('/', async(req,res) => {
    res.send("hello")
} )


module.exports = router;