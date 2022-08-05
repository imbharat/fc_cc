# fc_cc

## Steps to run
#### i) npm install
#### ii) npm start

## Steps to run the tests
#### i) npm install
#### ii) npm test

## API endpoints
### GET
#### i) /cache/:id
  <b> Get cache by id <br /> </b>
  &emsp;URI => localhost:3000/cache/1 <br />
  &emsp;Response => "f6ty5k0hlf" => A random string, stored as a value against the id, in the cache
#### ii) /cache/keys
  <b> Get all cache keys <br /> </b>
  &emsp;URI => localhost:3000/cache/keys <br />
  &emsp;Response => [1, 2, 3] => Array of all stored keys
    
### POST
#### i) /cache/:id
  <b> Add new  key value pair in the cache, with id as key and value any random string or the one provided in the payload <br />
  <b> or </b> Update the value corresponding to the key passed as id in the route <br /> </b>
  &emsp;URI => localhost:3000/cache/1 <br />
  &emsp;Payload => { <br />
  &emsp;&emsp;value: string, <br />
  &emsp;&emsp;ttl: integer <br />
  &emsp;} <br />
  &emsp;Response => "f6ty5k0hlf" => A random string, stored as a value against the id, in the cache <br /> <br />
  <b> NOTE: Payload is optional, if value is sent then that would be stored in cache otherwise a random string. Also, if ttl is not passed then 300 seconds is default </b>
    
### DELETE
#### i) /cache/:id
  <b> Delete cache by id <br /> </b>
  &emsp;URI => localhost:3000/cache/1 <br />
  &emsp;Response => "Item removed from cache"
#### ii) /cache
  <b> Clear all cache <br /> </b>
  &emsp;URI => localhost:3000/cache <br />
  &emsp;Response => "Cache cleared"
    
    
## NOTES:
#### 1. By default application server runs on port 3000. This can be changed from npm scripts inside package.json file.
#### 2. By default backend code implements a logic which makes cache valid only for 5 minutes. Custom time can be passed (in seconds) in the payload while adding or updating the cache.
#### Server uses Mongoose connection pool, instead of opening and closing connection for every database query.
#### Cache is invalidated at the code level, not at the database level. To do it on the database level, a ttl index can be created on modifiedDate column (not present right now), which will automatically delete the entry from the database.
