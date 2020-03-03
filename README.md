# IP Location Search & Query & SMS with NodeJS and MongoDB
A web service application implemented by node.js, express.js, mongoose and the fetch API.

### Step 1 Pre
Download Node.js, npm at https://www.npmjs.com/get-npm

### Step 2 Clone
Copy the command line
`$ git clone https://github.com/yy2881/IPLocation.git`

`$ cd iplocation`

`$ npm install`

### Step 3 Config MongoDB connection

1. Sign in to mongoDB Atlas and build a new cluster
2. Click CONNECT
3. Add current IP address to whitelist and create a mongoDB user
4. Replace the `mongoose.connect(mongodb+srv://admin:Abc123@cluster0-1tctl.mongodb.net/test?retryWrites=true&w=majority)` in app.js with the given connection uri, make sure to replace the username and password

### Step 4 Run application

`$ node app.js`

### Step 5 Open browser and visit `http://localhost:4555`
Now play around and check query results.

*Notice*
1. If the input IP is not valid, the service will return null.
2. The input mobile number should be E.164 format but without the + character.
