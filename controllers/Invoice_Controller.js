var db = require("../dbConection");
let invoiceController = {};

invoiceController.getInvoices = async (req, res) => {
  try {
    db.query("SELECT * FROM Invoces", (err, data) => {
      if (!err) {
        res.json(data);
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

invoiceController.getInvoice = async (req, res) => {
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
                res.json(data);
              } else {
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

invoiceController.PostInvoice = async (req, res) => {
  try {
    const { IDClient, Dte, SubTotal, Discount, Total, Products } = req.body;
    var queryN1 =
      "INSERT INTO Invoces(IDClient,Dte,Subtotal,Discount,Total) VALUES";
    queryN1 += `(${IDClient},'${Dte}',${SubTotal},${Discount},${Total})`;
    db.query(queryN1, (err, data) => {
      if (!err) {
        Products.forEach((product) => {
          var queryN2 =
            "INSERT INTO soldproducts(product,quantity,invoiceID)VALUES";
          queryN2 += `(${product.Id},${product.Quantity},${data.insertId})`;
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

invoiceController.getSubtotal = async (req, res) => {
  try {
    const query = "SELECT * FROM products where Product_ID=";
    const { Id, Quantity } = req.body;
    db.query(query + Id, (err, data) => {
      if (!err) {
        res.json({
          result: data[0].Product_Price * Quantity,
        });
      } else {
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

module.exports = invoiceController;
