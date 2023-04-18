
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY,
    email VARCHAR(40),
    user_name VARCHAR(40)
);

INSERT INTO users (id,email, user_name) VALUES 
    (1,'test@test.co', 'tester123'),
    (2,'test@test.co', 'tester123'),
    (3,'test@test.co', 'tester123'),
    (4,'test@test.co', 'tester123'),
    (5,'test@test.co', 'tester123'),
    (6,'test@test.co', 'tester123');

CREATE TABLE topics (
    id INT NOT NULL PRIMARY KEY,
    topic VARCHAR(20) NOT NULL
);

INSERT INTO topics (id, topic) VALUES (1,'topic-a'),(2,'topic-b');

CREATE TABLE subscribers (
    id INT NOT NULL PRIMARY KEY,
    topic_id INT NOT NULL,
    user_id INT NOT NULL,
    is_active INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topics(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO subscribers (id, topic_id, user_id, is_active) VALUES 
    (1,1,2,1),
    (2,2,2,1),
    (3,2,2,1),
    (4,2,3,1),
    (5,1,4,1),
    (6,1,1,1),
    (7,1,2,1),
    (8,2,2,1),
    (9,2,2,1),
    (10,2,3,1),
    (11,1,4,1),
    (12,1,1,1);

CREATE TABLE messages (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    body TEXT,
    is_active INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

INSERT INTO messages (user_id, body, is_active) VALUES 
    (1, 'random message from your friend', 1),
    (2, 'random message from your friend', 1),
    (1, 'random message from your friend', 1),
    (4, 'random message from your friend', 1),
    (1, 'random message from your friend', 1),
    (3, 'random message from your friend', 1),
    (3, 'random message from your friend', 1),
    (1, 'random message from your friend', 1),
    (4, 'random message from your friend', 1),
    (5, 'random message from your friend', 1),
    (1, 'random message from your friend', 1),
    (6, 'random message from your friend', 1);

