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
    const takenSurveyId = idGenerator();
    var respondent = req.body.form_response.answers;
    respondent = respondent.filter(ans => ans["type"] === "email");
    respondent = respondent[0].email
    var questions = req.body.form_response.definition.fields;
    questions = questions.map(question => question.title);

    var answers = req.body.form_response.answers;
    answers = answers.forEach(ans => {
        var answer = "";
        switch (ans.type) {
            case "choice":
                answer = ans.choice.label;
                break
            case "choices":
                answer = ans.choices.labels.join(', ');
                break
            default:
                answer = ans[ans.type];
        }
        var newAnswer = new Answer({
            answer,
            taken_survey_id: takenSurveyId,
            typeform_question_id: ans.field.id,
        })
        newAnswer
            .save()
            .catch(err => console.log(err));
    })
    
    var newTakenSurvey = new TakenSurvey({
        id: takenSurveyId,
        createdAt: Date(),
        respondent,
        questions
    })
    newTakenSurvey
        .save()
        .then(result => res.status(200).end())
        .catch(err => console.log(err));
})

app.listen(port, () => console.log(`app listening on port ${port}`));