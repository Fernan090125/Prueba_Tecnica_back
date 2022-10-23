let productController={}  ;
var db = require('../dbConection')


productController.getProducts=async (req,res)=>{
    db.query("SELECT * FROM products",(err,data)=>{
        if(!err){
            console.log(data)
            res.json({
                res:data
            });
        }else{
            console.log(err)
        }
    })
}

productController.getProduct=async (req,res)=>{
    const query = "SELECT * FROM products where Product_ID="+req.params['id'];
    db.query(query,(err,data)=>{
        if(!err){
            console.log(data)
            res.json({
                res:data
            });
        }else{
            console.log(err)
        }
    })
}


module.exports = productController;