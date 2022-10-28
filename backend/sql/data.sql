-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
DELETE FROM loginTable;
INSERT INTO loginTable(usr) VALUES ('{"name":"John Smith","email":"jsmith0@ucsc.edu","password":"1234"}');

DELETE FROM foodTable;
INSERT INTO foodTable(item, amount, purchaseDate, notes)
    VALUES ('{"name":"eggs"}', 5, '2022-10-27', 'these are my notes');