var User=require('../models/user.js')
//登录界面
exports.showSignin = function(req,res){	  
	    res.render('signin',{
	    title:'登录',	   
	    })	 
}
//登录处理
exports.signin = function(req,res){
	  var _user = req.body.user
	  var name = _user.name
	  var password = _user.password	  
	  User.findOne({name:name},function(err,user){
	    if(err) {console.log(err)}
	    
	    if (!user) {
	      console.log('no user')
	      return res.redirect('/signup')
	    }
	  
	   user.comparePassword(password,function(err,isMatch){
	      if(err){console.log(err)}
	      	
	      if(isMatch){
	         req.session.user = user
	        // console.log('have user')
	         return res.redirect('/')
	      }
	      else{
	        console.log("not have password")
	      }
	    })
	  })
}
//注册界面
exports.showSignup = function(req,res){	  
	    res.render('signup',{
	    title:'注册',	   
	    })	 
}
//注册
exports.signup = function(req,res){
	  var _user = req.body.user	 	 
	 User.findOne({name: _user.name}, function(err,user){
	    if(err) {console.log(err)}	  		
	    if (user) {
	       res.redirect('/signin')
	    }
	    else{
	    	var user = new User(_user)	    	
	    	user.save(function(err,user){
	    		if(err){
	    			console.log(err)
	    		}	    		
	    	res.redirect('/admin/user/list')
	    	})
	    }
	  })
	}
exports.list = function(req,res){
	  User.fetch(function(err,user){
	    if(err){
	      console.log(err);
	    }
	    res.render('userlist',{
	    title:'User List',
	    users: user
	    })
	  })
	}

//delete 
exports.del = function(req,res){
	  var id=req.query.id
	  console.log('success')
	  if(id){
	    User.remove({_id:id},function(err,user){
	      if (err) {
	        console.log(err);
	      } else {
	      	console.log('success')
	        res.json({success: 1});
	      }
	    })
	  }
}
//logout退出
exports.logout = function(req,res){		
		delete req.session.user 	
		delete res.locals.user 	  
		res.redirect('/')
}

//mddier
exports.signinRequired = function(req,res,next){		
		var _user = req.session.user
		if(!_user){
			res.redirect('/signin')
		}
		next()
}
exports.adminRequired = function(req,res,next){		
		var _user = req.session.user
		if(_user.role<=10||_user.role=='undefinded'||_user.role==''){
			res.redirect('/signup')
		}
		next()
}
		
