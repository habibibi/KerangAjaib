const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class QnA extends Model {}

QnA.init({
  question: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'qna',
});

module.exports = QnA;
