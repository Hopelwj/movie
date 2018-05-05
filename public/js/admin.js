//e是event事件的缩写，相当于读取目标元素p触发事件的目标节点<p>event节点内容</p>里的内容
//通过e可以调出来执行p.click事件时候p元素里面的内容。

$(function(){
    $('.del').click(function(e){ //e 是被jquery改造后的event对象
        //return confirm('确定要删除吗');
        var target = $(e.target); //点的是哪个按钮
        var id = target.data('id');
        var tr = $(`.item-id-${id}`); //拿到表格的一行     
        $.ajax({
            method: 'DELETE',
            url: `/admin/movie/list?id=${id}`,
        })
        .done(function(results){
            if(results.success === 1){
                if(tr.length >0 ){
                    tr.remove();   
                }
            }
        });     
    })

    $('#douban').blur(function(){
        var douban = $(this)
        var id = douban.val()
        //console.log('sss')
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/subject/' + id,
                cache:true,
                type:'get',
                dataType:'jsonp',
                crossDomain:true,
                jsonp:'callback',
                success:function(data){
                    var country=data.countries[0]
                    if(country=='中国'){
                        $('inputLanguage').val='中文'
                    }
                    $('#inputTitle').val(data.title)
                    $('#inputDoctor').val(data.directors[0].name)
                    $('#inputCountry').val(data.countries[0])
                    $('#inputLanguage').val('英文')
                    $('#inputPoster').val(data.images.large)
                    $('#inputFlash').val('')
                    $('#inputYear').val(data.year)
                    $('#inputSummary').val(data.summary)
                }
            })
        }
    })
});