module.exports = (option) => async (req, res, next) => {
    // 将请求参数转换为模型名称
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../model/${modelName}`)
    next()
}