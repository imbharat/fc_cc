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
  Get cache by id
    URI => localhost:3000/cache/1
    Response => "f6ty5k0hlf" => A random string, stored as a value against the id in the cache
#### /cache/keys
  Get all cache keys
    URI => localhost:3000/cache/keys
    Response => [1, 2, 3] => Array of all stored keys
    
