const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const repoSchema = new Schema({
    title :{required: true, type:String},
    stars : {required:true,default :0, type:Number}
    });
    

const Repo = model('repos', repoSchema);
module.exports = Repo