module.exports =async app =>{
    const mongoose = require('mongoose')
    let res =await mongoose.connect('mongodb://localhost:27017/node-vue-moba',
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
   require('require-all')(__dirname,'./../model')
}