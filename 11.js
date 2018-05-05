app.post('/user/signin',function(req,res){
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name:name},function(err,user){
    if(err) {console.log(err)}

    if (!user) {
      return res.redirect('/')
    }

    User.comparePassword(password,function(err,isMatch){
      if(err){console.log(err)}
      if(isMatch){
         //req.session.user = user
         return res.redirect('/')
      }
      else{
        console.log("not have password")
      }
    })

  })
})
//logout
app.get('/logout',function(){
 // delete req.session.user
  delete app.locals.user
  res.redirect('/')
})

//app.use(express.cookieParser())
/*app.use(express.session({
  secret:'imooc',
  store:new mongoStore({
    url:dburl,
    collection:'sessions'
  })
}))
//pre user handell
app.use(function(req, res,next){
  var _user = res.session.user
  if(_user){
    app.locals.user = _user
  
  }
 
   return next()
  
})*/