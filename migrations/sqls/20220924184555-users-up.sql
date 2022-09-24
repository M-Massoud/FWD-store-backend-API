-- creat users table
CREATE TABLE users(id serial primary key,
firstName VARCHAR(20) NOT NULL,
lastname VARCHAR(20) NOT NULL,
password VARCHAR(20) NOT NULL );