//引入模組
const express = require('express')

const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

//首頁路由
router.get('/', (req, res) => {
  const UserId = req.user.id

  return Todo.findAll({
    where: { UserId },
    raw: true,
    nest: true,
  })
    .then((todos) => { return res.render('index', { todos }) })
    .catch(err => { return res.status(422).json(err) })
})

//匯出模組
module.exports = router