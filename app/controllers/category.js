var Category=require('../models/category.js')

exports.new = function (req, res) {
	  res.render('category_admin', {
	      title: 'i_movie 后台分类录入页',
	      category: {}
	  });
}
//分类
exports.save =  function(req,res){	  
	  var _category=req.body.category;
	  //console.log(' _category'+ _category.name)
	    category = new Category(_category)
	    category.save(function(err,category){
	      if (err) {
	        console.log(err);
	      }
	    //console.log(category)
	    res.redirect('/admin/category/list');
	    });
	  
	}
exports.list = function(req,res){
	  Category.fetch(function(err,categories){
	    if(err){
	      console.log(err);
	    }	    
	    res.render('categorylist',{
	    title:'category List',
	    categories: categories
	    })
	  })
	}
