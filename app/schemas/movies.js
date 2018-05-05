var mongoose=require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MovieSchema = new Schema({
  title: String,
  doctor: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  category:{
    type:ObjectId,
    ref:'Catetory'
  },
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
MovieSchema.pre('save',function(next){
  if(this.isnew){
    this.meta.creatAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next()
})


//静态方法
MovieSchema.static('findByID',function(id,cb){
    return this
    .findOne({_id:id})
    .exec(cb)
})
  
  MovieSchema.static('fetch',function(cb){
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb)
  });

module.exports = MovieSchema