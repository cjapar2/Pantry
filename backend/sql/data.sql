-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
-- Password for John Smith is 1234 --
DELETE FROM loginTable;
INSERT INTO loginTable(usr) VALUES ('{"name":"John Smith","email":"jsmith0@ucsc.edu","password":"$2a$10$WzNcpJH0p9I.OaMxr.ONN.xsRa1D1v.ohfhcOlgrjqBUrIuZfDTXO"}');

DELETE FROM foodTable;
INSERT INTO foodTable(item, amount, purchaseDate, notes, tags) VALUES ('eggs', 5, '2022-10-27', 'these are my notes', '{"shared": true}');