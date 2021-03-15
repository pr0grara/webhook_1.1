// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const SurveySchema = new Schema({
//   number: { type: Number, required: true },
//   user: { type: String, required: true },
//   questions: { type: Array, required: true },
//   date: { type: Date, default: Date() },
// });

// const Survey = mongoose.model("surveys", SurveySchema);

// module.exports = Survey;

const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.PG_CONN_STRING);

const Survey = db.define('Survey', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  questions: {
    // type: DataTypes.ARRAY(DataTypes.JSONB)
    type: DataTypes.JSONB
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
})

module.exports = Survey;