const mongoose = require('mongoose');
const Annonce = mongoose.model ('Annonce',{

    title:{
        type:String 
    },
    description:{
        type: String 
    },
    category :{
        type: Number 
    },
    type:{
        type: String 
    },
    images:{
        type: String 
    },
    createdAt:{ 
        type: Date
    },
})

module.exports = Annonce ;