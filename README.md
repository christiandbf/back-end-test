# Back end test - Rest API providers

CRUD for providers collection.

## Run

* NodeJS version used 8.11.3.

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
* HTTP 400 code is used for for malformed requests; the issue is on the sender's side.
* For GET, PUT and DELETE endpoints, ID must be sent as a query string.
* For POST and PUT endpoints, the content to save is specified in the body request with Content-Type x-www-form-urlencoded or application/json.

### Get providers

Return all the providers saved. You can fetch one using his/her ID in a query string.

```
GET /providers/
GET /providers?id="ID provider to get"
```

#### Parameters:
| Parameter    | Type          | Mandatory  | Description                   |
| ------------- |---------------|------------|-------------------------------|
| ID            | String        | No         | Get provider by ID used in DB |

#### Response:
```
[
    {
        "_id": "5b19841fc2b6447803632a81",
        "projectedStartDate": "2018-06-07T19:14:39.820Z",
        "createdAt": "2018-06-07T19:14:39.820Z",
        "updatedAt": "2018-06-07T19:14:39.820Z",
        "__v": 0
    },
    {
        "_id": "5b1984bac2b6447803632a82",
        "firstName": "Marko",
        "lastName": "David",
        "middleName": "Andres",
        "email": "dzuck@email.com",
        "projectedStartDate": "2018-06-07T19:17:14.842Z",
        "employerId": 1,
        "providerType": "1",
        "staffStatus": "1",
        "assignedTo": 9,
        "status": "ACTIVE",
        "createdBy": 1,
        "createdAt": "2018-06-07T19:17:14.843Z",
        "updatedBy": 1,
        "updatedAt": "2018-06-07T19:18:40.246Z",
        "speciality": "5a6ebab31d8b1478343d4ad6",
        "__v": 0
    } ...
]
```

### Delete provider

Delete a provider. You pass the ID of the provider to delete in a query string, return the provider data deleted or null if the ID does not exist.

```
DELETE /providers?id="ID provider to delete"
```

#### Parameters:
| Parameter    | Type          | Mandatory  | Description                   |
| ------------- |---------------|------------|-------------------------------|
| ID            | String        | Yes        | Provider ID used in DB        |

#### Response 
```
{
    "_id": "5b659cc1ed4d8a34c496a292",
    "createdAt": "2018-08-04T12:29:02.747Z",
    "updatedAt": "2018-08-04T12:54:50.726Z",
    "name": "Maria",
    "lastname": "Fernandez",
    "status": "False",
    "email": "js@js.com",
    "city": "String",
    "adress": "String",
    "specialty": "String",
    "document": "String",
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

The schema is defined as follow, but it does not make any check before to save the data.
```
name: String,
lastname: String,
status: String,
email: String,
city: String,
adress: String,
specialty: String,
document: String
```

#### Parameters:
| Parameter    | Type            | Mandatory  | Description                   |
| -------------|-----------------|------------|-------------------------------|
| Values       | Key-par or JSON | Yes        | Values to save in DB          |

#### Response
```
{
    "_id": "5b684afb09aa37668bebc4a0",
    "name": "String",
    "lastname": "String",
    "status": "String",
    "email": "String",
    "city": "String",
    "specialty": "String",
    "document": "String",
    "createdAt": "2018-08-06T13:19:55.020Z",
    "updatedAt": "2018-08-06T13:19:55.020Z",
    "__v": 0
}
```

### Update provider

Update a provider. Pass the ID of the provider in a query string and send the data to update in the body. Return the last entry before to update.

```
PUT /providers?id="ID to update"
```

You can use the following mime types in your Content-Type header and provide the data in the body:
* x-www-form-urlencoded (key par value).
* application/json (json).

The schema is defined as follow, but it does not make any check before to save the data.
```
name: String,
lastname: String,
status: String,
email: String,
city: String,
adress: String,
specialty: String,
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
    "_id": "5b684afb09aa37668bebc4a0",
    "name": "String",
    "lastname": "String",
    "status": "String",
    "email": "String",
    "city": "String",
    "specialty": "String",
    "document": "String",
    "createdAt": "2018-08-06T13:19:55.020Z",
    "updatedAt": "2018-08-06T13:19:55.020Z",
    "__v": 0
}
```

### Considerations
For all endponts which use ID in a query string:
* If the ID does not exist, the enpoint return null and 200 status code.
* If the ID does not correspond to the format used on MongoDB or it is not provided, the enpoint return a error message and 400 status code.
```
{
    "message": "Bad request, revise the parameters provided"
}
```
