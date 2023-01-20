const mongoose = require("mongoose")
const Schema =mongoose.Schema

const studentSchema = new Schema({
  name:String, 
  age:Number,
  email:String,
  gen:String
})
const studentModel = mongoose.model("Student",studentSchema )
module.exports=studentModel