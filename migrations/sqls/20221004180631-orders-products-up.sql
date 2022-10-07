CREATE TABLE orders_products (id SERIAL PRIMARY KEY,
product_id INT REFERENCES products (id),
order_id INT REFERENCES orders (id),
quantity INT NOT NULL
);