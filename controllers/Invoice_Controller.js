let invoceController={}  ;

invoceController.getInvoices=async (req,res)=>{
    res.send("GETED");
}

invoceController.getInvoice=async (req,res)=>{
    res.send("GETED");
}

invoceController.PostInvoice=async (req,res)=>{
    res.send("POSTED");
}


module.exports = invoceController;