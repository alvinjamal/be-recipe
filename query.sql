CREATE TABLE users(
    id_user VARCHAR NOT NULL PRIMARY KEY, 
    fullname VARCHAR NOT NULL, 
    email TEXT NOT NULL,  
    phone VARCHAR, password TEXT NOT NULL, 
    verif VARCHAR(1), 
    otp VARCHAR(6));

ALTER TABLE users ADD COLUMN verif VARCHAR(1);

DROP TABLE users ;

DROP TABLE comment ;
 

CREATE TABLE recipe(
    id_recipe SERIAL PRIMARY KEY,
    title VARCHAR, 
    ingredients VARCHAR, 
    photo VARCHAR,
    video VARCHAR
    );

CREATE TABLE comment(
    id_comment SERIAL PRIMARY KEY,
    comment_text VARCHAR NOT NULL,
    users_id VARCHAR REFERENCES users(id_user),
    recipe_id INT REFERENCES recipe(id_recipe)
);
