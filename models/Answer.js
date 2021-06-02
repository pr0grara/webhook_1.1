const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.PG_CONN_STRING);

const Answers = db.define('answers', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   primaryKey: true
  // },
  answer: {
    type: DataTypes.TEXT
  },
  taken_survey_id: {
    type: DataTypes.TEXT
  },
  typeform_question_id: {
    type: DataTypes.TEXT
  },
})

module.exports = Answers;