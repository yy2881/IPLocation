# IP Location Search & Query & SMS with NodeJS
A web service application implemented by node.js, express.js and the fetch API.

### Download this repository and run command line

`git clone https://github.com/yy2881/IPLocation.git`

`$ cd iplocation`

`$ npm install`

`$ nodemon app.js`

### Open browser and visit `http://localhost:4555`

*Notice*
1. If the input IP is not valid, the service will return null.
2. The input mobile number should be E.164 format but without the + character.
3. If testing with the function of "Query with date range" function, the record existing in mongodb starts from March 1. If the input start date is before March 1, the query result will be null.
