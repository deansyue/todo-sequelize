//引入模組
const express = require('express')
const exphbs = require('express-handlebars').engine
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

//載入路由器
const router = require('./routes')

const app = express()
const PORT = 3000

//設定網頁handlebars相關設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 使用 express內建的body - parser 進行前置處理
app.use(express.urlencoded({ extended: true }))
// 設置每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(router)



//監聽伺服器
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})