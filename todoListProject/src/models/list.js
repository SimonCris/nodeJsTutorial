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
      List.belongsTo(models.User);
      List.hasMany(models.Todo);
    }
  }
  List.init({
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      index: true,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true,
      unique: true,
      validate: { /** Validatori di Sequelize (vedere docs per la lista completa dei validatori)*/
        notEmpty: {
          msg: 'Column name is not empty.'
        },
        len: {
          args: [6, 255],
          msg: 'Column name must be between 6 and 255 characters long.'
        }
      }
    }
  }, {
    hooks: {}, /** Gli hooks sono eventi che si scatenano in diversi momenti relativi alle action fatte sul model */
    sequelize,
    modelName: 'List',
    tableName: 'lists',
    underscored: true
  });
  return List;
};
