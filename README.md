# LAB - 37

# Project Dental - Back-end

### Author: Joanna Arroyo

### Links and Resources
* [submission PR](https://github.com/joanna-401-advanced-javascript/project-dental-back/pull/2)
* [travis](https://travis-ci.com/joanna-401-advanced-javascript/project-dental-back)

## Documentation
* [Jsdocs]() - currently only available locally

### Modules
#### `app.js` `auth-router.js` `user.js` `roles.js` `material.js` `detail.js` `404.js` `500.js`

##### Exported Values and Methods
###### TBC

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db
* `SECRET` - Secret string used for encoding

#### Running the app
* `npm start`
* Endpoint: `/`
  * Test route
* Endpoint: `/signup`
  * Signs a user up with username and password
* Endpoint: `/signin`
  * Existing user signs in with username and password
   
#### Tests
* Unit tests: `npm run test`
* Lint tests: `npm run lint`

#### UML
![UML Image](./assets/uml.jpg)