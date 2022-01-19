//引入模組
const express = require('express')

const router = express.Router()

//首頁路由
router.get('/', (req, res) => {
  res.send('hello world')
})

//匯出模組
module.exports = router