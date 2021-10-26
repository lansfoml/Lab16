DROP TABLE IF EXISTS humans;

CREATE TABLE memory (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  screenname VARCHAR(255)

);

DROP TABLE IF EXISTS followers;

CREATE TABLE memory (
  id_followee INT,
  id_follower INT
  

);