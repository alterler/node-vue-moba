module.exports = app => {
    const express = require("express")
    const AdminUser = require('../../model/AdminUser')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')

    const Auth = require('../../middleware/auth')
    const Resource = require('../../middleware/resource')

    // 创建子路由表
    const route = express.Router({
        mergeParams: true
    })

    // 创建路由
    route.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 列表路由
    route.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName == 'Category') {
            queryOptions.populate = 'parent'
        }

        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 详情路由
    route.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 编辑路由
    route.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除路由
    route.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 资源 路由挂载
    app.use('/admin/api/rest/:resource', Resource(), Auth(), route)



    // 物品图标上传
    const multer = require('multer')
    // const upload = multer({
    //     dest: __dirname + '/../../uploads'
    // })
    // 通过 filename 属性定制
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../uploads'); // 保存的路径，备注：需要自己创建
        },
        filename: function (req, file, cb) {
            // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
            cb(null, +Date.now() + '-' + file.originalname);
        }
    });

    // 通过 storage 选项来对 上传行为 进行定制化
    var upload = multer({
        storage: storage
    })

    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        // res.set('Content-Type','application/json; charset=utf-8');
        // res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.send(file)
    })

    // 用户登录
    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        assert(username, 422, '用户名必填')
        assert(password, 422, '用户密码必填')
        const user = await AdminUser.findOne({
            username
        }).select('+password')
        assert(user, 422, '用户不存在')
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send(token)
    })

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
        await next()
    })
}