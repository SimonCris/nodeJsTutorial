'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.List);
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    }
  }, {
    sequelize,
    modelName: 'User', /** Nome del model che sarà usato nell'applicativo */
    tableName: 'users', /** Nome della tabella che sarà creata a DB */
    underscored: true /** Accetta gli underscore nei nomi delle colonne. ad esempio created_at */
  });
  return User;
};
