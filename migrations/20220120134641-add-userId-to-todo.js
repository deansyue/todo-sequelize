'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Todos', 'UerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos', 'UserId')
  }
};
