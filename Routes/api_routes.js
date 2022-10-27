const { Router } = require("express");
const router = Router();

const {
  getInvoices,
  PostInvoice,
  getInvoice,
  getSubtotal,
} = require("../controllers/Invoice_Controller");
const { getclients, getclient } = require("../controllers/Clients_Controller");
const {
  getProducts,
  getProduct,
} = require("../controllers/Product_Controller");

router.get("/", (req, res) => {
  res.send("OK 👍");
});

router.get("/Products", getProducts);
router.get("/Products/:id", getProduct);

router.get("/Clients", getclients);
router.get("/Clients/:id", getclient);

router.get("/Invoces", getInvoices);
router.get("/Invoces/:id", getInvoice);
router.post("/Invoces", PostInvoice);

router.post("/Invoces/subtotal/", getSubtotal);

module.exports = router;
