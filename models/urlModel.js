const mongoose=require('mongoose');
const shortid = require('shortid');
const urlSchema=new mongoose.Schema({
    long:{
        type:String,
        required:true,
    },
    shrinkedUrl:{
        type:String,
        default:shortid.generate,
        required:true
    }
});
module.exports=mongoose.model('Url',urlSchema);