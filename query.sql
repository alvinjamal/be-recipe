CREATE TABLE users(
    id_user VARCHAR NOT NULL PRIMARY KEY, 
    fullname VARCHAR NOT NULL, 
    email TEXT NOT NULL,  
    phone VARCHAR, password TEXT NOT NULL, 
    photo VARCHAR(300) DEFAULT NULL,
    verif VARCHAR(1), 
    otp VARCHAR(6));

CREATE TABLE recipe(
    id_recipe SERIAL PRIMARY KEY,
    title VARCHAR, 
    ingredients VARCHAR, 
    photo VARCHAR,
    video VARCHAR,
    user_id VARCHAR REFERENCES users(id_user)
    );

CREATE TABLE comment(
    id_comment SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    user_id VARCHAR REFERENCES users(id_user),
    recipe_id INT REFERENCES recipe(id_recipe)
);

CREATE TABLE liked_recipe (
    id_liked SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id_user),
    recipe_id INT REFERENCES recipe(id_recipe)
);

CREATE TABLE saved_recipe (
    id_saved SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id_user),
    recipe_id INT REFERENCES recipe(id_recipe)
);

DROP TABLE comment;
DROP TABLE 