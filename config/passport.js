//引入模組
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

//載入 model
const db = require('../models')
const User = db.User

module.exports = app => {
  //初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  //設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        //找不到使用者
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'Email未被註冊'))
        }

        //使用bcrypt比對函式，判斷密碼是否輸入正確
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              //密碼輸入錯誤時
              return done(null, false, req.flash('warning_msg', 'Email或password錯誤'))
            }

            //密碼輸入正碼時
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  //設定facebook登入策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOKSecret,
    callbackURL: process.env.FACEBOOK_URL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  //設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        user = user.toJSON()
        done(null, user)
      })
      .catch(err => console.log(err))
  })
}