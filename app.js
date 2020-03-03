//import modules and initialize
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
app.use(bodyParser.json());
require('dotenv').config();
var AWS = require('aws-sdk');


//connect to database and create the model
//!!replace the uri with your cluster connection uri given by MongoDB Atlas, remember to replace <username> and <password>
mongoose.connect("mongodb+srv://admin:Abc123@cluster0-1tctl.mongodb.net/test?retryWrites=true&w=majority",
  {useNewUrlParser: true});
const connect = mongoose.connection;
connect.on('err', console.error.bind(console, 'connection error:'));
connect.once('open',()=> {
  console.log("Connect to MongoDB");
})
require("./record");
const Record = mongoose.model("Record");




//Three screens for IP location search, record query and SMS message
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'history.html'));
})

app.get('/sms', (req, res) => {
  res.sendFile(path.join(__dirname, 'sms.html'));
})




//create a new record in mongodb
app.post('/', (req, res) => {
  var newRecord = {
    ip: req.body.ip,
    createdDate: req.body.createdDate,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    city: req.body.city
  }
  var record = new Record(newRecord);
  record.save().then((err, result) => {
    console.log("new record created!");
    res.json({
      result: req.body,
      msg: "Successfully inserted record!!!",
      error: null
    });
  }).catch((err) => {
    if (err) {
      throw err;
    }
  })
});


// Query: get all records
app.get('/all', (req, res) => {
  Record.find().then((records) => {
    if (records) {
      res.json(records);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {
    if (err) {
      throw err;
    }
  });
});

// Query: get last N records
app.get('/lastNlocations/:num', (req, res) => {
  var n = parseInt(req.params.num);
  Record.find().sort('-createdDate').limit(n).then((records) => {
    if (records) {
      res.json(records);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {
    if (err) {
      throw err;
    }
  });
});


// Query: get records that created within a time range
app.get('/dateRangeWithin', (req, res) => {

  var dateStart = parseInt(req.query.start);
  var dateEnd = parseInt(req.query.end);
  console.log(dateStart);
  console.log(dateEnd);
  //var d = date.valueOf(date);
  //console.log(d);
  Record.find({
    createdDate: {
      $lte: dateEnd,
      $gte: dateStart
    }
  }).then((records) => {
    res.json(records);
  }).catch(err => {
    if (err) {
      throw err;
    }
  })
});


// SMS: send message to a phone number
app.get('/sendSMS', (req, res) => {
  console.log("Message = " + req.query.message);
  console.log("Number = " + req.query.number);
  var params = {
    Message: req.query.message,
    PhoneNumber: '+' + req.query.number,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        'DataType': 'String',
        'StringValue': 'location'
      }
    }
  };
  var publishTextPromise = new AWS.SNS({
    apiVersion: '2010-03-31'
  }).publish(params).promise();
  publishTextPromise.then(
    function(data) {
      res.end(JSON.stringify({
        MessageID: data.MessageId
      }));
    }).catch(
    function(err) {
      res.end(JSON.stringify({
        Error: err
      }));
    });

});



app.listen(4555, () => {
  console.log("running");
})
