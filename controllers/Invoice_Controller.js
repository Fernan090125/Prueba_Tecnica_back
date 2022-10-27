var db = require("../dbConection");
let invoceController = {};

invoceController.getInvoices = async (req, res) => {
  try {
    db.query("SELECT * FROM Invoces", (err, data) => {
      if (!err) {
        res.json({
          response: data,
        });
      } else {
        res.json({
          res: "ERROR SELECTING INVOCES",
        });
      }
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

invoceController.getInvoice = async (req, res) => {
  try {
    db.query(
      "SELECT * FROM Invoces where Invoice_ID=" + req.params["id"],
      (err, data) => {
        if (!err) {
          db.query(
            "SELECT * FROM soldproducts where invoiceID=" + req.params["id"],
            (err2, data2) => {
              if (!err2) {
                data[0].products = data2;
                res.json({
                  response: data,
                });
              } else {
                console.log(err2);
              }
            }
          );
        } else {
          res.json({
            res: "ERROR SELECTING AN INVOICE",
          });
        }
      }
    );
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

invoceController.PostInvoice = async (req, res) => {
  try {
    const { IDClient, Dte, SubTotal, Discout, Total, products } = req.body;
    var queryN1 =
      "INSERT INTO Invoces(IDClient,Dte,Subtotal,Discount,Total) VALUES";
    queryN1 += `(${IDClient},'${Dte}',${SubTotal},${Discout},${Total})`;
    db.query(queryN1, (err, data) => {
      if (!err) {
        products.forEach((product) => {
          var queryN2 =
            "INSERT INTO soldproducts(product,quantity,invoiceID)VALUES";
          queryN2 += `(${product.id},${product.quantity},${data.insertId})`;
          db.query(queryN2, (err2, data2) => {
            if (err2) {
              res.json({
                res: "FAILED TO SAVE PRODUCTS",
              });
            }
          });
        });
        res.json({
          res: "OK",
        });
      } else {
        console.log(err);
        res.json({
          res: "FAILED TO SAVE INVOICE",
        });
      }
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

invoceController.getSubtotal = async (req, res) => {
  try {
    const query = "SELECT * FROM products where Product_ID=";
    const { id, q } = req.body;
    db.query(query + id, (err, data) => {
      if (!err) {
        res.json({
          cal: data[0].Product_Price * q,
        });
      }
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

module.exports = invoceController;
