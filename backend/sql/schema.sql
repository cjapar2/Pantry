-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --

DROP TABLE IF EXISTS loginTable;

CREATE TABLE loginTable(usr jsonb PRIMARY KEY);

CREATE TABLE foodTable(
    item jsonb
);