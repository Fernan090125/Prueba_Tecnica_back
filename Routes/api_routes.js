const { Router } = require("express");
const router = Router();

const {getInvoices,PostInvoice} = require('../controllers/Invoice_Controller');


router.get("/", (req,res)=>{res.send("OK 👍")});
router.get("/Products")
router.get("/Invoces",getInvoices)
router.get("/Invoces/:id",getInvoices)
router.post("/Invoces",PostInvoice)

module.exports = router;
