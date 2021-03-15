const express = require("express");
const path = require("path");
const Answer = require("../../models/Answer");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "This is answers route" });
});

router.post('/new', (req, res) => {
  console.log(req.body)
  const [user, question, content, resultNo, analysis] = [req.body.user, req.body.question, req.body.content, req.body.resultNo, req.body.analysis];
  const newAnswer = new Answer({
    user,
    question,
    content,
    analysis,
    resultNo
  });

  console.log(newAnswer);
  // newAnswer
  //   .save()
  //   .then(answer => res.json(answer))
  //   // .then(answer => console.log("saved????"))
  //   .catch(err => console.log(err))
})

router.post('/analyze', (req, res) => {
  // console.log(req)
  const textToAnalyze = req.body.text;
  // console.log(textToAnalyze)
  analyze(credentials, [textToAnalyze])
    .then(analyzed => res.json(analyzed))
    .catch(err => console.log(err))
}) 

module.exports = router;
