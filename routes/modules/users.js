//引入模組
const express = require('express')

const router = express.Router()

//設定login表單的路由
router.get('/login', (req, res) => {
  res.render('login')
})

//設定login表單回傳資料的路由
router.post('/login', (req, res) => {
  res.send('login')
})

//設定進入註冊表單的路由
router.get('/register', (req, res) => {
  res.render('register')
})

//設定註冊表回傳資料的路由
router.post('/register', (req, res) => {
  res.render('register')
})

//設定登出路由
router.get('/logout', (req, res) => {
  res.render('logout')
})

//匯出模組
module.exports = router