const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Session extends Model {}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'session',
});

module.exports = Session;
