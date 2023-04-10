const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('users', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    defaultValue: function () {
      return Math.round(Math.random() * (99999 - 10000) + parseInt(99999));
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  status: {
    type: DataTypes.ENUM('active', 'disable'),
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = User;
