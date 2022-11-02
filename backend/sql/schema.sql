-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --

DROP TABLE IF EXISTS loginTable;

CREATE TABLE loginTable(usr jsonb PRIMARY KEY);

CREATE TABLE foodTable(
    item VARCHAR(1000),
    amount INT,
    purchaseDate DATE, -- YYYY-MM-DD
    notes VARCHAR(1000) -- 1000 is the max # of characters
);