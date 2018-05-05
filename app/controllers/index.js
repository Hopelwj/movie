const Movie=require('../models/movies.js')
var Category=require('../models/category.js')
//index page
exports.index =  function (req, res) {
	Category
	.find({})
	.populate({path:'movies',options:{limit:6}})
	.exec(function(err,categories){
		  if (err) {
	      console.log(err);
	    }
	    res.render('index', {  // 渲染index 首页
	      title: 'i_movie 首页',
	      categories: categories
	    })
	})
}
exports.search =  function (req, res) {
	var catID = req.query.cat
	var page = parseInt(req.query.p)
	var count = 2
	var index = page * count
	var totalPage
	
	Category.find({_id:catID},function(err,categores){//拿到总页数
			  if (err) {console.log(err);}
			  var category = categores[0]||{}
		   	  var movies =category.movies ||[]
		   	  //console.log('movies.length'+movies.length)
		   	  totalPage =Math.ceil(movies.length/count)
			})
	Category
		.find({_id:catID})
		.populate({
			path:'movies',
			options:{limit:count,skip:index}
		})
		.exec(function(err,categores){
			  if (err) {
		      console.log(err);
		    }		    		
		    var category = categores[0]||{}
		    var movies =category.movies ||[]		    
		    //console.log(Math.ceil(movies.length/count))	
		    res.render('results', {  // 渲染index 首页
		      title: 'i_movie 结果列表',
		      keyword:category.name,
		      category: category,
		      currentPage :page,
		      query:'cat='+catID,
		      totalPage:totalPage	      
		    })
		})
}

