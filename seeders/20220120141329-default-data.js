'use strict';
//匯入模組
const bcrypt = require('bcryptjs')

//建立種子使用者資料
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then(userId => queryInterface.bulkInsert('Todos',
        Array.from({ length: 10 }).map((_, i) => ({
          name: `name-${i}`,
          UerId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        ), {}))
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Todos', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
};
