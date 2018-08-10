# Back end test - Rest API providers

CRUD for providers collection.

## Run

* **NodeJS version used 8.11.3**.

1. Install the dependencies needed. Run the following command in the project root folder. 
```
npm install
```

2. Set the environment variables. You can use a [.env](https://github.com/motdotla/dotenv) file in the project root folder.
```
PORT=80 // If you do not provide the port, the app use port 3000
DB_USER=******
DB_PASSWORD=******
```

3. Launch the server.
```
npm start
```

## API Endpoints

### General information
* All endpoints return either a JSON object or array.
* For GET, PUT and DELETE endpoints, ID must be sent as a query string.
* For POST and PUT endpoints, the content to save is specified in the body request with Content-Type x-www-form-urlencoded or application/json.

### Get providers

Return all the providers saved. You can fetch one using his/her ID in a query string.

```
GET /providers/
GET /providers?id=********
GET /providers?id=******&populate=true
```

#### Parameters:
| Parameter     | Type          | Mandatory  | Description                          |
| ------------- |---------------|------------|-------------------------------------|
| ID            | String        | No         | Get provider by ID used in DB       |
|               |               |            |                                     |
| populate      | String        | No         | Replace specialty ID with its value |

**NOTE: only use "populate" with entries with ID which points to specialty entries on "specialties" collection. A lot of entries on "providers" collection do not implement this** 

#### Response:
```
[
    {
        "_id": "5b6cf60d9f7098a249e13cb2",
        "name": "Christian",
        "lastname": "Barrios",
        "status": "Active",
        "email": "christiandbf@hotmail.com",
        "city": "Cartagena",
        "address": "Urb. Villa",
        "specialty": "5a1ee5e6d0e8cfb9049a7904",
        "document": "123456789",
        "createdAt": "2018-08-10T02:18:53.479Z",
        "updatedAt": "2018-08-10T02:32:44.015Z",
        "__v": 0
    },
    {
        "_id": "5b6cfb04a79265a2af9922a2",
        "name": "Luis",
        "lastname": "Barrios",
        "status": "Active",
        "email": "christiandbf@hotmail.com",
        "city": "Cartagena",
        "address": "Urb. Villa",
        "specialty": "5a1ee5e6d0e8cfb9049a7904",
        "document": "123456789",
        "createdAt": "2018-08-10T02:40:04.529Z",
        "updatedAt": "2018-08-10T02:54:14.238Z",
        "__v": 0
    } ...
]
```

#### Response with populate:
```
{
    "_id": "5b6db372e7da54b54925b95d",
    "name": "Luis",
    "lastname": "Barrios",
    "status": "Active",
    "email": "christiandbf",
    "city": "Cartagena",
    "address": "Urb. Villa",
    "specialty": {
        "_id": "5a1ee5e6d0e8cfb9049a7904",
        "name": "Adolescent Medicine",
        "createdBy": 5028,
        "createdAt": "2017-02-23T10:03:08.462Z",
        "updatedBy": 35,
        "updatedAt": "2017-11-29T00:37:07.721Z"
    },
    "document": "123456789",
    "updatedAt": "2018-08-10T15:48:30.626Z",
    "createdAt": "2018-08-10T15:46:58.832Z",
    "__v": 0
}
```

### Delete provider

Delete a provider. You pass the ID of the provider to delete in a query string.

```
DELETE /providers?id=********
```

#### Parameters:
| Parameter    | Type          | Mandatory  | Description                   |
| ------------- |---------------|------------|-------------------------------|
| ID            | String        | Yes        | Provider ID used in DB        |

#### Response 
```
{
    "_id": "5b6cfb04a79265a2af9922a2",
    "name": "Luis",
    "lastname": "Barrios",
    "status": "Active",
    "email": "christiandbf@hotmail.com",
    "city": "Cartagena",
    "address": "Urb. Villa",
    "specialty": "5a1ee5e6d0e8cfb9049a7904",
    "document": "123456789",
    "createdAt": "2018-08-10T02:40:04.529Z",
    "updatedAt": "2018-08-10T02:54:14.238Z",
    "__v": 0
}
```

### Create provider
Create provider. Return the provider saved. 

```
POST /providers/
```

You can use the following mime types in your Content-Type header and provide the data in the body:
* x-www-form-urlencoded (key par value).
* application/json (json).

The schema is defined as follow. **All the properties are required**.
```
name: String,
lastname: String,
status: String, // Only accept "Active" or "Not active"
email: String, // The email is checked
city: String,  
address: String,
specialty: String, // ID of a spealty defined in specialties collection
document: String
```

JSON example.
```
{
  name: 'Christian',
  lastname: 'Barrios',
  status: 'Active',
  email: 'christiandbf@hotmail.com',
  city: 'Cartagena',
  address: 'Urb. Villa',
  specialty: '5a1ee5e6d0e8cfb9049a7904',
  document: '123456789',
}
```

#### Parameters:
| Parameter    | Type            | Mandatory  | Description                   |
| -------------|-----------------|------------|-------------------------------|
| Values       | Key-par or JSON | Yes        | Values to save in DB          |

#### Response
```
{
    "_id": "5b6a0c66bf4d9d7be2e3c719",
    "name": "Christian",
    "lastname": "Barrios",
    "status": "Active",
    "email": "christiandbf@hotmail.com",
    "city": "Cartagena",
    "address": "Urb. Villa",
    "specialty": "5a1ee5e6d0e8cfb9049a7904",
    "document": "123456789",
    "createdAt": "2018-08-07T21:17:26.779Z",
    "updatedAt": "2018-08-07T21:17:26.779Z",
    "__v": 0
}
```

### Update provider

Update a provider. Pass the ID of the provider in a query string and send the data to update in the body. Return the last entry before to update.

```
PUT /providers?id=********
```

You can use the following mime types in your Content-Type header and provide the data in the body:
* x-www-form-urlencoded (key par value).
* application/json (json).

The schema is defined as follow. **You can only send the properties that you want to update**.
```
name: String,
lastname: String,
status: String, // Only accept "Active" or "Not active"
email: String, // The email is checked
city: String,  
address: String,
specialty: String, // ID of a spealty defined in specialties collection
document: String
```

#### Parameters:
| Parameter    | Type            | Mandatory  | Description                   |
| -------------|-----------------|------------|-------------------------------|
| Values       | Key-par or JSON | Yes        | Values to save in DB          |
| ID           | String          | Yes        | ID used in DB                 |

#### Response
```
{
    "_id": "5b6a0c66bf4d9d7be2e3c719",
    "name": "Christian",
    "lastname": "Barrios",
    "status": "Active",
    "email": "christiandbf@hotmail.com",
    "city": "Cartagena",
    "address": "Urb. Villa",
    "specialty": "5a1ee5e6d0e8cfb9049a7904",
    "document": "123456789",
    "createdAt": "2018-08-07T21:17:26.779Z",
    "updatedAt": "2018-08-07T21:17:26.779Z",
    "__v": 0
}
```
