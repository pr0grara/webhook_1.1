const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.PG_CONN_STRING);

const Answers = db.define('answers', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  createdAt: {
    type: DataTypes.DATE
  },
  respondent: {
    type: DataTypes.TEXT
  },
  questions: {
    type: DataTypes.ARRAY
  }
})

module.exports = Answers;