CREATE TABLE users(id VARCHAR NOT NULL PRIMARY KEY, fullname VARCHAR NOT NULL, email TEXT NOT NULL,  phone VARCHAR, password TEXT NOT NULL, verif VARCHAR(1), otp VARCHAR(6));

ALTER TABLE users ADD COLUMN verif VARCHAR(1);

ALTER TABLE recipe DROP COLUMN id;

ALTER TABLE users ADD COLUMN token TEXT;

CREATE TABLE recipe(title VARCHAR, ingredients VARCHAR, photo VARCHAR,  video VARCHAR);

CREATE TABLE comment(id INT, comment VARCHAR, users_id Foreign Key () REFERENCES (), recipe_id Foreign Key () REFERENCES () );

DROP TABLE users