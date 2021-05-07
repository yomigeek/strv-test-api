# STRV OLAOYE YOMI API
An Address book contact API
[![Build Status](https://travis-ci.com/yomigeek/strv-test-api.svg?branch=develop)](https://travis-ci.com/yomigeek/strv-test-api)
[![Coverage Status](https://coveralls.io/repos/github/yomigeek/strv-test-api/badge.svg?branch=develop)](https://coveralls.io/github/yomigeek/strv-test-api?branch=develop)

### Hosted Url
- Heroku hosted link: https://strv-test-api.herokuapp.com/api/v1
- API Documentation: https://documenter.getpostman.com/view/4214152/TzRRBo7M

### Features

###### API Features
- Signup a user
- Login a user
- Add a contact

### Technology
- Node
- Express
- PostgreSQL


### Installation
* Create a folder on your computer and navigate to the folder using your terminal
* git clone https://github.com/yomigeek/strv-test-api.git
* Run `npm install` or yarn install to install packages and dependencies
* Run `npm run dev` to start the server on the local environment
* Navigate to http://localhost:5000/api/v1 on your browser to have access to the API
* Create an .env file in your root folder using the detail in the .env.example file and updating the variables values.

#### Signup A user /api/v1/auth/signup

To create a user, post the following parameters

NB: All fields are required 

```
{
   email: "sample@example.com",
   password: "string"
}
```

#### Login A user /api/v1/auth/login

To login a user, post the following parameters

NB: All fields are required 

```
{
   email: "sample@example.com",
   password: "string"
}

```

#### Create a contact /api/v1/contact/add

To create a contact, post the following parameters

``` Send a POST request method to /api/v1/contact/add ```

with a token as x-access-token either at the header or body


### Author
Made with <3 by Yomi Olaoye ;)
