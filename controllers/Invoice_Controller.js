var db = require("../dbConection");
let invoceController = {};

invoceController.getInvoices = async (req, res) => {
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
};

invoceController.getInvoice = async (req, res) => {
  db.query(
    "SELECT * FROM Invoces where Invoice_ID=" + req.params["id"],
    (err, data) => {
      if (!err) {
        db.query(
          "SELECT * FROM soldproducts where invoiceID=" + req.params["id"],
          (err2, data2) => {
            if(!err2){
                data[0].products=data2
                res.json({
                    response: data,
                  });
                
            }else{
                console.log(err2)
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
};

invoceController.PostInvoice = async (req, res) => {
  const { IDClient, Dte, Subtotal, Discount, Total, products } = req.body;
  var queryN1 =
    "INSERT INTO Invoces(IDClient,Dte,Subtotal,Discount,Total) VALUES";
  queryN1 += `(${IDClient},'${Dte}',${Subtotal},${Discount},${Total})`;
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
      res.json({
        res: "FAILED TO SAVE INVOICE",
      });
    }
  });
};

module.exports = invoceController;
