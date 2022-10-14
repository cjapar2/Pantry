-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
DELETE FROM loginTable;
INSERT INTO loginTable(usr) VALUES ('{"name":"John Smith","email":"jsmith0@ucsc.edu","password":"1234"}');

DELETE FROM foodTable;
INSERT INTO foodTable(item) VALUES ('{"name":"eggs"}');