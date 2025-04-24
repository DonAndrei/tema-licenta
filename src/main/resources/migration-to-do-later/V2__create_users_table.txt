CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       isAdmin VARCHAR(20) NOT NULL,
                       depozitId INT
);
