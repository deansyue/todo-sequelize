//引入模組
const express = require('express')

const router = express.Router()

//載入router模組
const home = require('./modules/home')
const users = require('./modules/users')

// 將網址結構符合的字串開頭 ，導向相關模組
router.use('/users', users)
router.use('/', home)

//匯出路由
module.exports = router