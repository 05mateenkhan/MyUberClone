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

# Captain Registration API

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) with vehicle details. Returns a JWT token and the created captain object on success.

## Request Body

Send a JSON object:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, required): At least 3 characters.
- `email` (string, required): Must be a valid email.
- `password` (string, required): At least 6 characters.
- `vehicle.color` (string, required): At least 3 characters.
- `vehicle.plate` (string, required): At least 3 characters.
- `vehicle.capacity` (number, required): Must be a number.
- `vehicle.vehicleType` (string, required): Must be one of `car`, `motorcycle`, or `auto`.

## Responses

### Success

- **Status:** 201 Created
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

### Validation Error

- **Status:** 422 Unprocessable Entity
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### Duplicate Email Error

- **Status:** 400 Bad Request
- **Body:**
  ```json
  {
    "message": "Captain already exists"
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "Jane", "lastname": "Smith"},
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

## Additional Information

- All endpoints expect and return JSON.
- JWT token should be stored securely on the client for authenticated requests.
- Passwords are securely hashed before storage.
- Validation errors will be returned as an array under the `errors` key.
- Make sure to set the `Content-Type: application/json` header for all requests.
- The API uses environment variables for sensitive data (e.g., JWT secret).

---





# Captain Registration & Authentication API

## Base URL

`http://localhost:4000/captains`

---

## Endpoints

### 1. Register Captain

**POST** `/register`

#### Description

Registers a new captain (driver) with vehicle details. Returns a JWT token and the created captain object on success.

#### Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, required): At least 3 characters.
- `email` (string, required): Must be a valid email.
- `password` (string, required): At least 6 characters.
- `vehicle.color` (string, required): At least 3 characters.
- `vehicle.plate` (string, required): At least 3 characters.
- `vehicle.capacity` (number, required): Must be a number.
- `vehicle.vehicleType` (string, required): Must be one of `car`, `motorcycle`, or `auto`.

#### Responses

- **201 Created**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **422 Unprocessable Entity**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "Captain already exists"
  }
  ```

#### Example Request

```sh
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "Jane", "lastname": "Smith"},
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

### 2. Login Captain

**POST** `/login`

#### Description

Authenticates a captain with email and password. Returns a JWT token and the captain object on success.

#### Request Body

```json
{
  "email": "jane.smith@example.com",
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
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **422 Unprocessable Entity**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Example Request

```sh
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "yourpassword"
  }'
```

---

### 3. Get Captain Profile

**GET** `/profile`

#### Description

Returns the authenticated captain's profile information. Requires a valid JWT token in the request (as a cookie or Authorization header).

#### Headers

- `Authorization: Bearer <jwt_token>` (if not using cookies)

#### Responses

- **200 OK**
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "active",
      "socketId": null,
      "location": {
        "lat": null,
        "lng": null
      }
    }
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
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

### 4. Logout Captain

**GET** `/logout`

#### Description

Logs out the authenticated captain by blacklisting the JWT token and clearing the authentication cookie. Requires a valid JWT token.

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
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Additional Information

- All endpoints expect and return JSON.
- JWT token should be stored securely on the client for authenticated requests.
- Passwords are securely hashed before storage.
- Validation errors will be returned as an array under the `errors` key.
- Make sure to set the `Content-Type: application/json` header for all requests.
- The API uses environment variables for sensitive data (e.g., JWT secret).

---
# Ride Fare API

## Get Fare

**Endpoint:**  
`GET /rides/get-fare`

**Description:**  
Calculates the fare for a ride based on the provided pickup and destination addresses. The fare is computed for different vehicle types (auto, car, motorcycle) using distance and duration details.

**Query Parameters:**

- `pickup` (string, required)  
  The pick-up location. Must be at least 3 characters.
- `destination` (string, required)  
  The destination location. Must be at least 3 characters.

**Responses:**

### Success

- **Status:** `200 OK`
- **Body:**  
  A JSON object containing fare estimates for each vehicle type. For example:
  ```json
  {
    "auto": 75.50,
    "car": 110.75,
    "motorcycle": 50.20
  }
  ```

### Validation Error / Missing Parameters

- **Status:** `400 Bad Request`
- **Body:**  
  ```json
  {
    "error": [
      {
        "msg": "Invalid pickup address",
        "param": "pickup",
        "location": "query"
      },
      {
        "msg": "Invalid destination address",
        "param": "destination",
        "location": "query"
      }
    ]
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:4000/rides/get-fare \
  -H "Authorization: Bearer <jwt_token>" \
  -G \
  --data-urlencode "pickup=24B, Near Kapoor's cafe" \
  --data-urlencode "destination=Famous hills, Hyderabad"
```

For further details, refer to the [ride.routes.js](backend/routes/ride.routes.js) and [ride.controller.js](backend/controllers/ride.controller.js).