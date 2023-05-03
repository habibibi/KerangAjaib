const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Session = require('./session.model');

class Query extends Model {}

Query.init({
  query: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sessionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Session,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'query',
});

module.exports = Query;
