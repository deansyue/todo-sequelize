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
  //取得userId與 表單name的值
  const UserId = req.user.id
  const name = req.body.name
  const errors = []

  //若沒有輸入name，渲染new頁面並回傳錯誤訊息
  if (!name) {
    errors.push({ message: 'name欄位為必輸入欄位' })
    return res.render('new', { errors })
  }

  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
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
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))

})

//設定使用save傳送出修改表單的路由
router.put('/:id', (req, res) => {
  //取得userId id及表單資料
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body

  //查詢修改的指定資料
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      //將從資料庫資料name與isDone修改，並回傳至資料庫
      todo.name = name
      todo.isDone = (isDone === 'on')
      return todo.save()
    })
    //重新導向detail頁面
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})

//設定使用delete後的路由
router.delete('/:id', (req, res) => {

})

//匯出模組
module.exports = router