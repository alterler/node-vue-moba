const express = require("express")
const path = require('path')

// 创建app
const app = express()
app.set('secret', 'ajkfghnk')

// 导入跨域模块
app.use(require('cors')())

app.use(express.json())

// 静态资源托管
app.use(express.static(path.join(__dirname, '/uploads/')))
// console.log(path.join(__dirname, 'uploads/'))
// 连接数据库
require('./plugins/db')(app)
// 导入后端路由
require('./routes/admin/index')(app)
// 导入前端路由
require('./routes/web/index')(app)


app.listen(3000, () => {
    console.log('success!!!');
})