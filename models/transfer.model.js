const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiveUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
