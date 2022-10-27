let productController = {};
var db = require("../dbConection");

productController.getProducts = async (req, res) => {
  try {
    db.query("SELECT * FROM products", (err, data) => {
      if (!err) {
        console.log(data);
        res.json({
          res: data,
        });
      } else {
        console.log(err);
        res.json({
          error: "Error Selecting Products",
        });
      }
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

productController.getProduct = async (req, res) => {
  try {
    const query = "SELECT * FROM products where Product_ID=" + req.params["id"];
    db.query(query, (err, data) => {
      if (!err) {
        // console.log(data);
        res.json({
          res: data,
        });
      } else {
        // console.log(err);
        res.json({
          error: err,
        });
      }
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

module.exports = productController;
