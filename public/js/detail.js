$(function(){
    $('.comment').click(function(e){     
    	var target = $(this); 
        var toId = target.data('tid');//tid 当前评论人
        var commentId = target.data('cid');//  cid 当前评论id
      console.log('sss')     
        	 $('<input>').attr({
		       	 type:'hidden',
		       	 id:'toId',
		       	 name:'comment[tid]',
		       	 value:toId
	      	 	}).appendTo('#commentFrom')          
        	$('<input>').attr({
		       	 type:'hidden',
		       	 id:'commentId',
		       	 name:'comment[cid]',
		       	 value:commentId
	       		}).appendTo('#commentFrom')
        	 }
    });        
});
