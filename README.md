# Post API Documentation

## Endpoints:

- `POST/users/register`
- `POST/users/login`
- `POST/products`
- `GET/products`
- `PUT/products/:id`
- `DELETE/products/:id`

1. `POST/users/register`
   key:
   name
   email
   password

response:
{
"id": 1,
"email": "satrio@mail.com"
}

2. `POST/users/login`
   key:
   email
   password

   response:
   {
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYXRyaW9AbWFpbC5jb20iLCJpYXQiOjE2NTcyODk0ODF9.q5CvfzMEw5J2Ja4AMhYRyDc5x60yFD02wb7oLdqHJ5w",
   "userRole": "Admin",
   "userEmail": "satrio@mail.com"
   }

3. `POST/products`

## Need access_token

     key:
     productName
     description

response:
{
"result": {
"id": 1,
"productName": "Thermodynamic's Book",
"description": "You can calculate z value by read this book",
"userId": 1,
"updatedAt": "2022-07-08T14:29:03.929Z",
"createdAt": "2022-07-08T14:29:03.929Z"
}
}

4. `GET/products`

## Need access_token

     response:
     [
     {
     "id": 1,
     "productName": "Thermodynamic's Book",
     "description": "You can calculate z value by read this book",
     "userId": 1,
     "createdAt": "2022-07-08T14:29:03.929Z",
     "updatedAt": "2022-07-08T14:29:03.929Z"
     },
     {
     "id": 2,
     "productName": "Reactor Book",
     "description": "You can design reactor by read this book",
     "userId": 1,
     "createdAt": "2022-07-08T14:36:36.689Z",
     "updatedAt": "2022-07-08T14:36:36.689Z"
     }
     ]

5. `PUT/products/:id`

## Need access_token

     key:
     productName
     description

response:
{
"result": {
"id": 2,
"productName": "Reactor Book Vol.2",
"description": "You can design reactor and estimate cost production by read this book",
"userId": 1,
"createdAt": "2022-07-08T14:36:36.689Z",
"updatedAt": "2022-07-08T14:41:57.872Z"
}
}

6. `DELETE/products/:id`

## Need access_token

     response:
     1
