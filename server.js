require('dotenv/config');
const express = require('express');
const { Sequelize } = require('sequelize');
const TakenSurvey = require("./models/TakenSurvey");
const Answer = require("./models/Answer");
const idGenerator = require("./util");

const app = express();
const port = process.env.PORT || 9000;
const db = new Sequelize(process.env.PG_CONN_STRING);
try {
    db.authenticate()
        .then(console.log("succesfully connected to db"));
} catch {
    console.log("db connection failed")
}

app.use(express.json());

app.use(express.text());

// app.get('/hook', (req, res) => {
//     createHook("AhCdegfT", req.body)
//         .then(res => {
//             console.log(res)
//         })
//     console.log("AhCdegfT", req.body);
//     res.status(200).end();
// });

app.get('/', (req, res) => {
    res.status(200).end();
});

app.post('/', async (req, res) => {
    let ids = await Survey.findAll({
        attributes: ['id']
    });
    ids = ids.map(obj => obj.dataValues.id);
    ids = ids.sort((a, b) => b - a);
    const id = ids[0] + 1;

    var answers = req.body.form_response.answers;
    answers = answers.map(el => el[el.type]);
    const newSurvey = new Survey({
       id,
       username: req.body.form_response.answers[0].text,
       questions,
       answers,
       payload: req.body,
       createdAt: Date(),
       updatedAt: Date(),
    })
    
    newSurvey
        .save()
        .then(result => res.status(200).end())
        .catch(err => console.log(err));
    res.status(200).end();
})

app.listen(port, () => console.log(`app listening on port ${port}`));