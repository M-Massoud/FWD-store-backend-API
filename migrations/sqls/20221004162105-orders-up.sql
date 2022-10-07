create type order_status as enum('active', 'completed');

CREATE TABLE orders (id SERIAL PRIMARY KEY,
user_id INT REFERENCES users (id),
status order_status NOT NULL,
total_price INT NOT NULL    
);