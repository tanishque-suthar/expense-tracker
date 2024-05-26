const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        trim:true
    },
    type:{
        type:String,
        required:true,
        default:"income"
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type: String,
        required:true,
        trim:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})
module.exports = mongoose.model("Income",incomeSchema);