var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var schema = new mongoose.Schema({        
    
    name:{type:String,required:true,trim:true},
    age:{type:Number,required:true}, 
    address:[{
      _id:false,
      hno:{type:String,required:true,trim:true},
      city:{type:String,required:true,trim:true},
      state:{type:String,required:true,trim:true},
      country:{type:String,required:true,trim:true}
    }]

},{timestamps:true});

module.exports=mongoose.model('student',schema);