CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       nume VARCHAR(100) NOT NULL,
                       parola VARCHAR(255) NOT NULL,
                       privilegiu VARCHAR(20) NOT NULL,
                       depozit_id INT
);
