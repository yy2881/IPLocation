# IP Location Search & Query & SMS with NodeJS and MongoDB
A web service application implemented by node.js, express.js, mongoose and the fetch API.

### Step 1
Download Node.js, npm at https://www.npmjs.com/get-npm

### Step 2 Config MongoDB connection

1. Sign in to mongoDB Atlas and build a new cluster
2. Click CONNECT
3. Add current IP address to whitelist and create a mongoDB user
4. Replace the `mongoose.connect(mongodb+srv://admin:Abc123@cluster0-1tctl.mongodb.net/test?retryWrites=true&w=majority)` with the given connection uri including your *username* and *password*.

### Step 3 Run command lines

`git clone https://github.com/yy2881/IPLocation.git`

`$ cd iplocation`

`$ npm install`

`$ node app.js`

### Step 4 Open browser and visit `http://localhost:4555`
Now play around with it and check query results.

*Notice*
1. If the input IP is not valid, the service will return null.
2. The input mobile number should be E.164 format but without the + character.
