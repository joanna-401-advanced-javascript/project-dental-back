# LAB - 40

# Project Dental - Back-end

### Author: Joanna Arroyo

### Links and Resources
* [submission PR](https://travis-ci.com/joanna-401-advanced-javascript/project-dental-back)
* [travis](https://travis-ci.com/joanna-401-advanced-javascript/project-dental-back)
* [back-end](https://dental-materials-back.herokuapp.com/)

## Documentation
* [Jsdocs](https://dental-materials-back.herokuapp.com/docs/)

### Modules
#### `index.js` `app.js` `config.js` `auth-router.js` `api-router` `auth.js`
#### `mongoose-model.js` `user.js` `roles.js` `model-finder.js`
#### `material/index.js` `material-schema.js`
#### `detail/index.js` `detail-schema.js`
#### `404.js` `500.js`

##### Exported Values and Methods
###### TBC

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db
* `SECRET` - Secret string used for encoding
* `TOKEN_EXPIRE` - Authentication token lifetime

#### Running the app
* `npm start`
* Endpoint: `/signup`
  * Signs a user up with username and password
* Endpoint: `/signin`
  * Existing user signs in with username and password
* Endpoint: `/api/v1/:model`
* Endpoint: `/api/v1/:model/:id`
   
#### Tests
* Unit tests: `npm run test`
* Lint tests: `npm run lint`

#### UML
![UML Image](./assets/uml.jpg)