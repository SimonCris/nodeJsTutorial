'use strict';
const { Model } = require('sequelize');
const {User} = require("../models/user");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  List.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'List',
    tableName: 'lists',
    underscored: true
  });
  return List;
};
