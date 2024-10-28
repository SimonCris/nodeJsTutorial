'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

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
      index: true,
      validate: {
        notEmpty: {
          msg: 'Column name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true,
      unique: {
        args: true, /** A true abilita la visualizzazione del msg in caso di errore a DB */
        msg: 'Email already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Column name cannot be empty'
        },
        isEmail: {
          msg: 'Add a valid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true,
      validate: {
        notEmpty: {
          msg: 'Column name cannot be empty'
        },
        len: {
          args: [6, 255],
          msg: 'Password must be between 6 and 255 characters long'
        }
      }
    }
  }, {
    hooks: { /** Gli hooks sono eventi che si scatenano in diversi momenti relativi alle action fatte sul model */
      /** Hook scatenato prima della create */
      beforeCreate: async (user) => {
        // hash the password before creating a new user
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    sequelize,
    modelName: 'User', /** Nome del model che sarà usato nell'applicativo */
    tableName: 'users', /** Nome della tabella che sarà creata a DB */
    underscored: true /** Accetta gli underscore nei nomi delle colonne. ad esempio created_at */
  });
  return User;
};
