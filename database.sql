CREATE DATABASE loxzsurvey;

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    typeform_id TEXT UNIQUE,
    question TEXT,
    kind TEXT,
    options TEXT[],
    taken_surveys_id INTEGER,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    answer TEXT,
    taken_survey_id INTEGER,
    typeform_question_id TEXT,
);

CREATE TABLE taken_surveys(
    id SERIAL PRIMARY KEY,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);