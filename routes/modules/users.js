//引入模組
const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const db = require('../../models')
const User = db.User
const Todo = db.Todo

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
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('user is already exists')
        return res.render('register', { name, email, password, confirmPassword })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//設定登出路由
router.get('/logout', (req, res) => {
  res.render('logout')
})

//匯出模組
module.exports = router