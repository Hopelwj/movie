const _underscore= require('underscore');
const Movie=require('../models/movies.js')
const Comment=require('../models/comment.js')
const Category=require('../models/category.js')
//detail page
exports.detail=function(req,res){
	  var id = req.params.id;
	  Movie.findById(id,function(err,movie){
	  	Comment
	  	  .find({movie:id})
	  	  .populate('from','name')
	  	  .populate('reply.from reply.to','name')
	  	  .exec(function(err,comments){	  		  	  	
	  		 res.render('detail',{
			     title:'Imovie',
			     movie:movie,
			     comments:comments
	    	})
	  	})	     
	  })
	}
//delete 
exports.del = function(req,res){
	  var id=req.query.id	 
	  if(id){
	  	  Movie.findById(id,function(err,movie){//找到电影类型ID,(比如 恐怖)，然后在恐怖数组中吧该电影删除
		      if(err){console.log(err)}
		      	var categoryId= movie.category	
		        Category.findById(categoryId,function(err,category){//通过电影类型Id找到该类型 并把电影ID push到其movies[]
			      	var index = category.movies.indexOf(movie._id)		      	
			      	category.movies.splice(index,1)
			      	category.save(function(err,category){
			      			Movie.remove({_id:id},function(err,movie){
						      if (err) {console.log(err);}						        
						      else {
						        res.json({success: 1});
						      }
	    					})
	      			})
	      		}) 

	      	  })	    	   
	  }
}
// admin page 后台录入页
exports.new = function (req, res) {
	Category.find({},function(err,categories){
		//console.log(categories[0].name)
		res.render('admin', {
	      title: 'i_movie 后台录入页',
	      movie: {},
	      categories:categories
	  	})
	})
	  
}
//update page
exports.update =  function(req,res){
	  var id = req.params.id;
	  if(id){
	    Movie.findById(id,function(err,movie){
	    	Category.find({},function(err,categories){	    		
			      res.render('admin',{
			        title:'后台更新页面',
			        movie:movie,
			        categories:categories
			      })
			})
	    })
	  }
}

//上传影片
exports.save =  function(req,res){
	  var id = req.body.movie._id;
	  var movieObj=req.body.movie;
	  var _movie;
	  if(id){
	    Movie.findById(id,function(err,movie){
	      if(err){
	        console.log(err);
	      }
	      _movie = _underscore.extend(movie,movieObj)
	      _movie.save(function(err,movie){
	        if(err){
	          console.log(err)
	        }
	        res.redirect('/movie/' + movie._id)
	      });
	    });
	  } else{	  	
	    _movie = new Movie(movieObj)
	    var categoryId= _movie.category//电影类型Id
	    _movie.save(function(err,movie){
	      if (err) {
	        console.log(err);
	    	}
	      Category.findById(categoryId,function(err,category){//通过电影类型Id找到该类型 并把电影ID push到其movies[]
	      	category.movies.push(movie._id)

	      	category.save(function(err,category){
	      		 res.redirect('/movie/' + movie._id);
	      	})
	      })	   	 
	    })
	  }
	}

//movielist
exports.list = function(req,res){
	  Movie.fetch(function(err,movies){
	    if(err){
	      console.log(err);
	    }
	    res.render('list',{
	    title:'Imovie List',
	    movies:movies
	    })
	  })
	}

