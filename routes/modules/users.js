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
  const errors = []

  //有必輸入欄位沒填到，寫入錯誤訊息
  if (!name || !email || !password || !confirmPassword) errors.push({ message: '所有欄位都是必輸入欄位' })

  //password 與 confirmPassword不一樣，寫入錯誤訊息
  if (password !== confirmPassword) errors.push({ message: '密碼與確認密碼不相符' })

  //若有錯誤訊息，渲染register頁面，回傳錯誤訊息與使用者輸入資料
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }


  User.findOne({ where: { email } })
    .then(user => {
      user = user.toJSON()
      //檢查使用者是否有註冊
      if (user) {
        //若email已被註冊過，渲染register頁面，回傳錯誤訊息與使用者輸入資料
        errors.push({ message: 'Email已被註冊過!' })
        return res.render('register', { errors, name, email, password, confirmPassword })
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
        //重新導向首頁
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })

})

//設定登出路由
router.get('/logout', (req, res) => {
  //req.logout() 是 Passport.js 提供的函式，會清除 session
  req.logout()
  //給予成功登出訊息
  req.flash('success_msg', '已成功登出!')
  //重新導向登入頁面
  res.redirect('/users/login')
})

//匯出模組
module.exports = router