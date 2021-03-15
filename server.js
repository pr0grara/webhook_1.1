require('dotenv/config');
const express = require('express');
const { Sequelize } = require('sequelize');
const Survey = require("./models/Survey");

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
    // console.log(':)');
    // console.log(req.body);
    // console.log(Object.keys(req.body[0].answers));
    // console.log(JSON.parse(req.body));
    // console.log(JSON.stringify(req.body, null, 4));
    // console.log(req.body.form_response);
    // console.log(req.body.answers[0].email[5]);
    var arr = req.body.form_response.answers;
    arr = arr.map(el => el[el.type]);
    res.send(arr);
    // res.send((req.body.form_response.definition.fields))
    res.status(200).end();
});

app.post('/', async (req, res) => {
    const id = await Survey.findAll()
        .then(res => res.map(r => r).length)
        .catch(err => console.log(err));
    console.log(id)
    var questions = req.body.form_response.definition.fields;
    questions = questions.map(el => el.title);
    var answers = req.body.form_response.answers;
    answers = answers.map(el => el[el.type]);
    const newSurvey = new Survey({
       id,
       username: req.body.form_response.definition.fields[0].id,
       questions,
       answers,
       payload: req.body,
       createdAt: Date(),
       updatedAt: Date(),
    })
    // console.log(req.body.form_response.definition.fields)
    console.log(req.body.form_response)
    newSurvey
        .save()
        .then(result => res.status(200).end())
        .catch(err => console.log(err));
    // res.status(200).end();
})

app.listen(port, () => console.log(`app listening on port ${port}`));