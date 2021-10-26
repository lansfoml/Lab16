DROP TABLE IF EXISTS humans;

CREATE TABLE humans (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  screenname VARCHAR(255)

);

DROP TABLE IF EXISTS followers;

CREATE TABLE followers (
  id_followee INT,
  id_follower INT
  

);

DROP TABLE IF EXISTS memory;

