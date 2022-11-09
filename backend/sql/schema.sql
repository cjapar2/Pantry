-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --

DROP TABLE IF EXISTS loginTable;

CREATE TABLE loginTable(usr jsonb PRIMARY KEY);

DROP TABLE IF EXISTS foodTable;

CREATE TABLE foodTable(id SERIAL PRIMARY KEY, item VARCHAR(256), amount INT, purchaseDate DATE, notes VARCHAR(1000), tags jsonb);