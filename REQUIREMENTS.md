## API EndPoints

- users
  `GET` index all users `/users` [token required]
  `GET` show one user `/users/<user id>` [token required]
  `POST` add new user `/users`

```
{
    "firstname":"user test 1",
    "lastname": "user lastname test",
    "email":"test@test.com",
    "password": "12345"
}
```

`PATCH` edit a user `/users` [token required]

```
{
    "id":<user id>,
    "firstname":"update name",
    "lastname":"update lastnamewds",
    "password":"newpass"
}
```

`DELETE` to delete a user `/users/<user id>` [token required]

- Login
  `POST` to login `/login`

```
{
    "email":"test@test.com",
    "password":"12345"
}
```

you will be provided with the token if the email and password are correct so save them and send the token in the headers whenver token is required with your request

- products
  `GET` index all products `/products`
  `GET` show one product `/products/<product id>`
  `POST` add new product `/products` [token required]

```
  {
  "name":"product test 1",
  "price": 99

}
```

`PATCH` to update a product `/products` [token required]

```
{
    "id":1,
    "name":"update product name",
    "price":199
}
```

`DELETE` to delete a product `/products/<product id>` [token required]

- orders
  `GET` index all orders `/orders` [token required]
  `GET` show one order `/orders/<product id>` [token required]
  `POST` add new order `/orders` [token required]

```
  {
    "user_id":1,
    "status":"active",
    "total_price":90
}
```

`PATCH` to update an order `/order` [token required]

```
{
    "id":1,
    "user_id": 1,
    "status": "completed",
    "total_price": 90
}
```

`DELETE` to delete an order `/orders/<order id>` [token required]

`POST` add product to order `/orders/<order id>/addProduct` [token required]

```
{
"product_id":<product id>,
 "quantity":<quantity number>
}
```

`DELETE` remove product from order `/orders/<order id>/removeProduct`

```
{
  "product_id":<product id>
}
```

## database schema

- users

```
id - SERIAL - PRIMARY KEY
firstName - VARCHAR(30) -NOT NULL
lastname - VARCHAR(30) - NOT NULL
email - VARCHAR(60) - NOT NULL - UNIQUE
password - VARCHAR(255) - NOT NULL
```

- products

```
  id - SERIAL - PRIMARY KEY
  name - VARCHAR(255) -NOT NULL
  price - INT -NOT NULL
```

- orders

```
type order_status as enum('active', 'completed')

id - SERIAL - PRIMARY KEY,
user_id - INT - REFERENCES users (id)
status - order_status
total_price - INT - NOT NULL
```

- orders_products

```
id - SERIAL - PRIMARY KEY
product_id - INT - REFERENCES  - products (id)
order_id - INT - REFERENCES orders -  (id)
quantity -  INT - NOT NULL
```
