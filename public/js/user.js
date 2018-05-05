$(function(){
    $('.del').click(function(e){ //e 是被jquery改造后的event对象
        var r= confirm('确定要删除吗');
        if(r)
        {
        	var target = $(e.target); //点的是哪个按钮
	        var id = target.data('id');
	        var tr = $(`.item-id-${id}`); //拿到表格的一行
	        $.ajax({
	            method: 'DELETE',
	            url: `/admin/user/list?id=${id}`,
	        })
	        .done(function(results){
	            if(results.success === 1){
	                if(tr.length >0 ){
	                    tr.remove();   
	                }
	            }
	        });
        }else return 
        
    });
});