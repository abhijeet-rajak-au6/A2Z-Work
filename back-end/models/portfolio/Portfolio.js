const { Schema, model } = require("mongoose");

const portfolioSchema = Schema({

    image:{
        type:String,
    },
    portfolioLink:{
        type:String
    },
    portfolioTitle:{
        type:String
    },
    overview:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
        
})

const portfolioModel = model("portfolio", portfolioSchema);
module.exports = portfolioModel;