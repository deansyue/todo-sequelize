//引入模組
const express = require('express')

const router = express.Router()

const db = require('../../models')
const User = db.User
const Todo = db.Todo

//首頁路由
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true,
  })
    .then((todos) => { return res.render('index', { todos }) })
    .catch(err => { return res.status(422).json(err) })
})

//匯出模組
module.exports = router