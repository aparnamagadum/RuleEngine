import mongoose from "mongoose";
const ruleSchema = new mongoose.Schema({
    ruleId: {
        type:String,
    },
    ruleString:  {
        type:String,
    },
    ast: Object, // Serialized AST representation
  },{timestamps:true});
  
const ruleModel=mongoose.model('rule', ruleSchema);
export default ruleModel