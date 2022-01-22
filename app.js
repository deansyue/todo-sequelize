//引入模組
const express = require('express')
const exphbs = require('express-handlebars').engine
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

//載入路由器
const router = require('./routes')
//載入 passport設定檔
const usePassport = require('./config/passport')

//若環境非為正式上線模式，則透過dotenv讀取.env檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

//設定網頁handlebars相關設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設置session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// 使用 express內建的body - parser 進行前置處理
app.use(express.urlencoded({ extended: true }))
// 設置每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
//調用usePassport函式，傳入必要參數app
usePassport(app)
//掛載connect-flash套件函式
app.use(flash())
//設定本地變數
app.use((req, res, next) => {
  //設定success和warning message
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// 將 request 導入路由器
app.use(router)



//監聽伺服器
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})