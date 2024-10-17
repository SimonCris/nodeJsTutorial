'use strict';
const { Model } = require('sequelize');
const List = require('../models').List;

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
      references: {
        model: {
          tableName: 'lists',
        },
        key: 'id'
      }
    },
    todo: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      index: true,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
    underscored: true
  });
  return Todo;
};
