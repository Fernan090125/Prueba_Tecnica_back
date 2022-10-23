let clientController={}  ;
var db = require('../dbConection')

clientController.getclients=async (req,res)=>{
    db.query("SELECT * FROM clients",(err,data)=>{
        if(!err){
            console.log(data)
            res.json({
                res:data
            });
        }else{
            console.log(err)
            res.json({
                res:"Error in the get clients fuction",
                err:err
            })
        }
    })
}

clientController.getclient=async (req,res)=>{
    const query = "SELECT * FROM clients where Client_ID="+req.params['id'];
    db.query(query,(err,data)=>{
        if(!err){
            console.log(data)
            res.json({
                res:data
            });
        }else{
            console.log(err)
            res.json({
                res:"Error in the get client fuction",
                err:err
            })
        }
    })
}


module.exports = clientController;