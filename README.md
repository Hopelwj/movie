运行与使用:
npm install 安装依赖
----
1. 启动数据库`mongod`,如果出现错误尝试输入`sudo mongod`来完成启动
2. 项目目录下的database是可供选择导入的数据库信息，可通过命令`mongorestore -h host -d dataName --dir=path` 来导入该文件夹信息到数据库中，其中-h是连接地址，如127.0.0.1 -d是将要创建数据库的名称，如douban(注意:项目中链接的数据库名称是douban,如果-d后创建的数据库名称叫douban2,则需要将app.js文件`dbUrl = 'mongodb://127.0.0.1/douban`中的douban改成douban2),--dir=后为该database所在路径，具体可通过`mongorestore --help`查看
3. 使用命令行工具在该项目目录下运行程序,默认是使用3000端口，若端口已占用可在主目录app.js文件中将3000端口换成未占用的端口