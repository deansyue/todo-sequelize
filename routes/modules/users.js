//引入模組
const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const router = express.Router()

const db = require('../../models')
const User = db.User

//設定login表單的路由
router.get('/login', (req, res) => {
  res.render('login')
})

//設定login表單回傳資料的路由
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//設定進入註冊表單的路由
router.get('/register', (req, res) => {
  res.render('register')
})

//設定註冊表回傳資料的路由
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      //檢查使用者是否有註冊
      if (user) {
        console.log('user is already exists')
        return res.render('register', { name, email, password, confirmPassword })
      }

      //產生加嚴密碼
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ //新增資料至資料庫
          name,
          email,
          password: hash
        }))
    })
    //重新導向首頁
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//設定登出路由
router.get('/logout', (req, res) => {
  res.render('logout')
})

//匯出模組
module.exports = router