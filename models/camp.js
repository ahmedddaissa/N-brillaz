const mongoose = require('mongoose');

const Camp = mongoose.model('Camp',{

    title:{
        type: String
    },
    description:{
        type : String
    },
    category:{
        type: String
    },
    image:{
        type:String
    },
    contact:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type: String,
            required:false
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

module.exports = Camp ;