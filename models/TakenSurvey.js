const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.PG_CONN_STRING);

const TakenSurvey = db.define('taken_surveys', {
  id: {
    type: DataTypes.TEXT,
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
    type: Sequelize.ARRAY(DataTypes.STRING)
  }
})

module.exports = TakenSurvey;