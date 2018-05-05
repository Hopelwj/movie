var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
  name:{
  	unique:true,
  	type:String
  },
  password :{
  	unique:true,
  	type:String
  },
  role:{
    type:Number,
    default:0
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
UserSchema.pre('save',function(next){
	var user = this
  if(this.isnew){
    this.meta.creatAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
  	if(err) return next(err)

  	bcrypt.hash(user.password,salt,function(err,hash){
  		if(err) return next(err)

  		user.password = hash
      
  		next()	
  	})	
  })
 
})
UserSchema.methods = {
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return cb(err)

			cb(null,isMatch)
		})
	}
}

//静态方法
UserSchema.static('findByID',function(id,cb){
    return this
    .findOne({_id:id})
    .exec(cb)
  })
  
  UserSchema.static('fetch',function(cb){
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb)
  });

module.exports = UserSchema