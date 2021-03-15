CREATE DATABASE loxzsurvey;

CREATE TABLE Surveys(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    questions TEXT[],
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
);

