let clientController = {};
var db = require("../dbConection");

clientController.getclients = async (req, res) => {
  try {
    db.query("SELECT * FROM clients", (err, data) => {
      if (!err) {
        res.json(data);
      } else {
        res.json({
          res: "Error in the get clients fuction",
          err: err,
        });
      }
    });
  } catch (e) {
    res.json({
      res: e,
    });
  }
};

clientController.getclient = async (req, res) => {
  try {
    const query = "SELECT * FROM clients where Client_ID=" + req.params["id"];
    db.query(query, (err, data) => {
      if (!err) {
        res.json(data);
      } else {
        res.json({
          res: "Error in the get client fuction",
          err: err,
        });
      }
    });
  } catch (e) {
    res.json({
      res: "Error in the get client fuction",
      err: e,
    });
  }
};

module.exports = clientController;
