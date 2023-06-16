const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const repoSchema = new Schema({
    repo :{required: true, type:String},
    stars : {required:true,default :0, type:String},
    author :{required:true,type:String},
    about :{required:true,type:String},
    link: {required:true,type:String},
    imgSrc: {required:true,type:String},
    });
    

const Repo = model('repos', repoSchema);
module.exports = Repo