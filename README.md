# Sweater Weather Express
Sweater Weather Express is a project that allows users to register, login, and retrieve a forecase for a location using API calls and responses.

## Learning Goals
* Utilize a project board to create and track details for project completion
* Practice written technical communication with concise and consistent git commits and clear pull requests
* Clearly document Introduction, Initial Setup, How to Use, Known Issues, Running Tests, How to Contribute, Core Contributors, Schema Design, and Tech Stack List
* Implement testing in JavaScript
* Familiarize self with mechanics of building an Express API

# Setup
### Requirements
* Node 10.16.3
* dotenv: using this package will ensure the security of sesitive environment variables
* bcrypt: using this package will allow for password management; be sure to create a `.env` file to store API keys
* jest: using this pachage will allow for a testing suit

### Configuration
* Fork and clone this repo to your local machine
* cd into express_sweater_weather directory and run `npm install` from your command line.
* Setup your database by running `npx sequelize db:create` and `npx sequelize db:migrate`
* You will need two API keys to get the forecast for a location:
  * GOOGLE_GEOCODE_API_KEY: (https://developers.google.com/maps/documentation/geocoding/start "Get started here")
  * DARK_SKY_API_KEY: (https://darksky.net/dev "Get started here")
  
# Endpoints

### POST /api/v1/users
Hitting this endpoint will create an account for a user with an email, password and password confirmation passed in the body of the request.
#### Example Request: 
  ```
  POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

#### Example Response
```
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### POST /api/v1/sessions
Hitting this endpoint will authenticate a user and takes in an email and password through the body of the request

#### Example Request: 
  ```
  POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```

#### Example Response
```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### GET /api/v1/forecast
Hitting this endpoint will return the current weather for a location, as well as both 8-hour and 7-day forecasts. A valid APi key needs to be passed in through the body, and a city and state will need to be passed in though the params.

#### Example Request: 
  ```
  GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
```

#### Example Response
```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

## Future Iterations:

#### POST /api/v1/favorites

Hitting this endpoint will create a new favorite for a user. 

Request: 
```
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
Successful Response
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

#### GET /api/v1/favorites

Hitting this endpoint will return a list of a user's favorite locations

```
GET /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
Response
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```

**** Removing Favorite Locations /api/v1/favorites

Hitting this endpoint will delete a favorite location from a specified user.

Request:
```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Response: 
```
status: 204

```
