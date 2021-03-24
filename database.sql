CREATE DATABASE loxzsurvey;

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    typeform_question_id TEXT UNIQUE,
    question TEXT,
    kind TEXT,
    options TEXT[],
    taken_survey_id TEXT,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
    updatedAt DATE
);

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    answer TEXT,
    taken_survey_id TEXT,
    typeform_question_id TEXT,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
    updatedAt DATE
);

CREATE TABLE taken_surveys(
    id TEXT PRIMARY KEY,
    respondent TEXT,
    questions TEXT[],
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
    updatedAt DATE
);