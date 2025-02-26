const mongoose = require('mongoose');

const User = mongoose.model('User',{

    name: {
        type: String 
    },
    age: {
        type:Number
    }, 
    email : {
        type:String 
    },
    phone: { 
        type: Number 
    },
    role: { 
        type: String, enum: ["parent", "admin"], default: "parent" 
    },


});


module.exports = User ;