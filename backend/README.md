# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user. Returns a JWT token and the created user object on success.

## Request Body

Send a JSON object:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, optional): At least 3 characters if provided.
- `email` (string, required): Must be a valid email.
- `password` (string, required): At least 6 characters.

## Responses

### Success

- **Status:** 201 Created
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status:** 400 Bad Request
- **Body:**
  ```json
  {
    "erros": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "John", "lastname": "Doe"},
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```


### 2. Login User

**POST** `/login`

#### Description

Authenticates a user with email and password. Returns a JWT token and the user object on success.

#### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email.
- `password` (string, required): At least 6 characters.

#### Responses

- **200 OK**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "erros": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Example Request

```sh
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Additional Information

- All endpoints expect and return JSON.
- JWT token should be stored securely on the client for authenticated requests.
- Passwords are securely hashed before storage.
- Validation errors will be returned as an array under the `erros` key.
- Make sure to set the `Content-Type: application/json` header for all requests.
- The API uses environment variables for sensitive data (e.g., JWT secret).

---

---

### 3. Get User Profile

**GET** `/profile`

#### Description

Returns the authenticated user's profile information. Requires a valid JWT token in the request (as a cookie or Authorization header).

#### Headers

- `Authorization: Bearer <jwt_token>` (if not using cookies)

#### Responses

- **200 OK**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Authentication failed"
  }
  ```

#### Example Request

```sh
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

### 4. Logout User

**GET** `/logout`

#### Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie. Requires a valid JWT token.

#### Headers

- `Authorization: Bearer <jwt_token>` (if not using cookies)

#### Responses

- **200 OK**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "message": "Authentication failed"
  }
  ```

#### Example Request

```sh
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Additional Information

- All endpoints expect and return JSON.
- JWT token should be stored securely on the client for authenticated requests.
- Passwords are securely hashed before storage.
- Validation errors will be returned as an array under the `erros` key.
- Make sure to set the `Content-Type: application/json` header for all requests.
- The API uses environment variables for sensitive data (e.g., JWT secret).

---