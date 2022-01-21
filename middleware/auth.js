module.exports = {
  authenticator: (req, res, next) => {
    //判斷是否有登入session
    if (req.isAuthenticated()) {
      //若是登入狀態，則進入下一路由
      return next()
    }

    //沒有登入則先給予錯誤訊息後，重新導向登入頁面
    req.flash('warning_msg', '必需登入才能使用此功能!')
    res.redirect('/users/login')
  }

}