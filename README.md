# Todo list (update: 2021/1/22)
這是一個使用node.js及MySQL框架所架構的待辦清單網站，在這裡您可以新增、修改、刪除、瀏覽儲存於資料庫內的待辦事項資料。

## 專案畫面
![img](/public/img/login.jpg)
![img](/public/img/index.jpg)


## Features 產品功能

1. 使用者需登入才可使用該網站
2. 使用者可使用email或facebook進行註冊
3. 使用者點擊Detail按鈕即可觀看待辦事項詳細資訊
4. 使用者可以新增待辦事項資料
5. 使用者可以刪除待辦事項資料
6. 使用者可以修改待辦事項詳細資料
7. 使用者可以使用修改將待辦事項標示為已完成狀態


## Environment Setup 環境建置
* Node.js
* Express
* MySQL
* Sequelize

## Installing 專案安裝流程
1. 打開您的終端機(terminal)，複製(clone)專案至本機
```
git clone https://github.com/deansyue/todo-sequelize.git
```

2. 進入存放此專案資料夾
```
cd todo-sequelize
```

3. 安裝npm套件
```
npm install
```

4. 使用腳本，創建種子資料
```
npx sequelize db:seed:all
```

5. 使用腳本，即可啟動伺服器
```
npm run dev
```

6. 當終端機(terminal)出現以下文字，代表伺服器已啟動
```
App is running on http://localhost:3000
```

## 種子資料使用者
可使用種子資料新增的使用者操作本專案
```
root
  email: root@example.com
  password: 12345678
```

## Contributor 專案開發人員
[deansyue](https://github.com/deansyue)
