const incomeSchema = require("../model/incomeModel")
exports.addIncome = async(req,res)=>{
    console.log(req.body);
    const {title,amount,date,category,paymentMethod} = req.body;

    const income = incomeSchema({
        title,
        amount,
        category,
        paymentMethod,
        date
    })

    try {
        if(!title || !amount || !category || !paymentMethod || !date){
            return res.status(400).json({message:"Fill all the fields"});
        }
        else if(amount<=0 && !amount==='number'){
            return res.status(400).json({message:"Amount must be a positive number greater than zero"});
        }
        await income.save();
        res.status(200).json({message:"income addition successful!"});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
    console.log(income);
}

exports.getIncomes = async(req,res)=>{
    try {
        const incomes = await incomeSchema.find().sort({createdAt: -1}); //by default last created item is at the bottom, therefore here i am sorting it in opposite order
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}

exports.deleteIncome = async(req,res)=>{
    const {id} = req.params;
    incomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"income deleted successfully"});
    })
    .catch((error)=>{
        res.status(500).json({message:"server error"});
    })
}