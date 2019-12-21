const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  
  
title:{
  type:String
},
text:{
  type:String,
  required:true
},
// file:{
//   type : String
// },
avatar:{
  type:String
}, 
likes:[
  {
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    }
  }
],
discussions:[{
  user:{
    type:Schema.Types.ObjectId,
    ref:'users'
  },
  text:{
    type:String,
    required:true
  },
  name:{
    type:String
  },
  avatar:{
    type:String
  }, 
  date:{
    type: Date,
    default:Date.now
  }
}
],
date:{
  type: Date,
  default:Date.now
}


})

module.exports= Book=mongoose.model('book',BookSchema)