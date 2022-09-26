-- creat users table
CREATE TABLE users(id serial primary key,
firstName VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(60) NOT NULL UNIQUE, 
password VARCHAR(255) NOT NULL );