DROP TABLE new_test;
CREATE TABLE `new_test` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(40)
);
INSERT INTO new_test (user, id) VALUES ('a',3),('b',4),('c',5);