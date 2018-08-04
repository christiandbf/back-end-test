# Back end test - Rest API providers

## Usage

1. Install the dependencies needed. Run the following command in the project root folder. 
```
npm install
```

2. Set the environment variables. You can use a .env file in the project root folder.
```
DB_USER=******
DB_PASSWORD=******
```
[How to set a .env file](https://github.com/motdotla/dotenv)

3. Launch the server.
```
npm start
```

## API Endpoints

### /providers - GET

Return all the providers saved. You can fetch one using his/her ID in a query string.

```
/providers?id=ID
```

### /providers - POST
Create provider. You can use the following mime types in your Content-Type header and provide the data in the body:
* x-www-form-urlencoded
* application/json

The schema is defined as follow, but it does not make any check before save the data.
```
name: String,
lastname: String,
status: String,
email: String,
city: String,
adress: String,
specialty: String,
createdAt: Date,
updatedAt: Date,
document: String
```

### /providers - DELETE

Delete a provider. You pass the ID of the provider to delete in a query string.

```
/providers?id=ID
```

### /providers - PUT

Update a provider. Pass the ID of the provider in a query string and send the data to update in the body.

```
/providers?id=ID
```
Mime types supported

* x-www-form-urlencoded
* application/json

For all endponts which use ID in a query string:
* If the ID does not exist, the enpoint return null and 200 status code.
* If the ID does not correspond to the format used on MongoDB, the enpoint return a error message and 400 status code.
```
{
    "message": "Bad request, revise the parameters provided"
}
```
