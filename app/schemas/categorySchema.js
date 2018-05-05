var mongoose=require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new Schema({
  name:String,
  movies:[{type:ObjectId,ref:'Movie'}],
  meta:{
    creatAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
}) 
//middleware
CategorySchema.pre('save',function(next){
  if(this.isnew){
    this.meta.creatAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next()
})


//静态方法
CategorySchema.static('findByID',function(id,cb){
    return this
    .findOne({_id:id})
    .exec(cb)
})

CategorySchema.static('fetch',function(cb){
    return this
    .find({})   
    .exec(cb)
 });

module.exports = CategorySchema