-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --

DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  usr jsonb
);

DROP TABLE IF EXISTS lists;

CREATE TABLE lists(
  id SERIAL PRIMARY KEY,
  list_name VARCHAR(100)
);

DROP TABLE IF EXISTS users_to_lists;

CREATE TABLE users_to_lists(
  id SERIAL PRIMARY KEY,
  usr_id INT NOT NULL,
  list_id INT NOT NULL,
  FOREIGN KEY (usr_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (list_id)
    REFERENCES lists(id)
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS food;

CREATE TABLE food(
  id SERIAL PRIMARY KEY,
  list_id INT, -- NOT NULL? --
  item VARCHAR(256), 
  amount INT, 
  purchaseDate DATE, 
  notes VARCHAR(1000), 
  tags jsonb,
  FOREIGN KEY (list_id) 
    REFERENCES lists(id)
    ON DELETE CASCADE
);

