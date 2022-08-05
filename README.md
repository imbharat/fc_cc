# fc_cc

## Steps to run
#### i) npm install
#### ii) npm start

## Steps to run the tests
#### i) npm install
#### ii) npm test

## API endpoints
### GET
#### /cache/:id
  Get cache by id <br />
    URI => localhost:3000/cache/1 <br />
    Response => "f6ty5k0hlf" => A random string, stored as a value against the id, in the cache
#### /cache/keys
  Get all cache keys <br />
  &emsp;URI => localhost:3000/cache/keys <br />
  &emsp;Response => [1, 2, 3] => Array of all stored keys
    
### POST
#### /cache/:id
  Add new  key value pair in the cache, with id as key and value any random string or the one provided in the payload <br />
  or <br />
  Update the value corresponding to the key passed as id in the route <br />
  &emsp;URI => localhost:3000/cache/1 <br />
  &emsp;&emsp;Payload => { <br />
  &emsp;&emsp;value: string, <br />
  &emsp;&emsp;ttl: integer <br />
  &emsp;&emsp;} <br />
  &emsp;Response => "f6ty5k0hlf" => A random string, stored as a value against the id, in the cache <br />
  NOTE: Payload is optional, if value is sent then that would be stored in cache otherwise a random string. Also, if ttl is not passed then 300 seconds is default <br />
    
### DELETE
#### /cache/:id
  Delete cache by id <br />
  &emsp;URI => localhost:3000/cache/1 <br />
  &emsp;Response => "Item removed from cache"
#### /cache
  Clear all cache <br />
  &emsp;URI => localhost:3000/cache <br />
  &emsp;Response => "Cache cleared"
    
    
### NOTES:
