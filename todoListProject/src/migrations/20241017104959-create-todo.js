'use strict';
const {DataTypes} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        index: true,
        references: {
          model: {
            tableName: 'lists',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      },
      todo: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        index: true,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};
