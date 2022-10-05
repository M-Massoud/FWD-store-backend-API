CREATE TABLE orders_products (id SERIAL PRIMARY KEY,
product_id INT REFERENCES products (id),
quantity INT NOT NULL
);