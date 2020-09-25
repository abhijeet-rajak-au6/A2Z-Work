const { Schema, model } = require("mongoose");


const jobSchema = Schema({

    projectFile:[{
        type:String
    }],
    category:{
        type:String
    },
    skills:[{
        type:String
    }],
    jobTitle:{
        type:String
    },
    projectDuration:{
        type:String
    },
    jobDescription:{
        type:String
    },
    projectType:{
        type:String
    },
    expertiseLevel:{
        type:String
    },
    budgetType:{
        type:String
    },
    budgetAmount:{
        type:Number
    },
    freelancerNo:{
        type:Number
    },
    jobStatus:{
        type:String
    },
    freelancerReview:{
        freelancerId:{
            type:Schema.Types.ObjectId,
            ref:"user",
        },
        ratings:{
            type:Number,
            default:0
        },
        feedback:{
            type:String
        },
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})


const jobModel = model("jobPost", jobSchema);
module.exports = jobModel;