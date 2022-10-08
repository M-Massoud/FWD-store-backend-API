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
