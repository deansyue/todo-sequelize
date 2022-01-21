//引入模組
const express = require('express')

const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

//設定new的路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//設定create功能路由
router.post('/', (req, res) => {

})

//設定detail路徑路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, userId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

//設定按下Edit後的路由
router.get('/:id/edit', (req, res) => {

})

//設定使用save傳送出修改表單的路由
router.put('/:id', (req, res) => {

})

//設定使用delete後的路由
router.delete('/:id', (req, res) => {

})

//匯出模組
module.exports = router