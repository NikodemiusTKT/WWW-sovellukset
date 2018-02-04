CREATE DATABASE IF NOT EXISTS messaging;

USE messaging;

CREATE TABLE messages 
(
id INT PRIMARY KEY AUTO_INCREMENT,
message CHAR,
time_to_show INT,
sender_id INT NOT NULL,
receiver_id INT NOT NULL,
);

CREATE TABLE users
(
id INT PRIMARY KEY AUTO_INCREMENT,
phone_number TEXT NOT NULL
);

ALTER TABLE messages
ADD CONSTRAINT FK_Sender
FOREIGN KEY (sender_id) REFERENCES users(id);

ALTER TABLE messages
ADD CONSTRAINT FK_Receiver
FOREIGN KEY (receiver_id) REFERENCES users(id);


