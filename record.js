const mongoose = require('mongoose');

/*var Date = {
  year: 2020,
  month: 2,
  day: 27
}*/
mongoose.model("Record",{
    //ipaddress,addDate,City,latitude,longitude

    ip: {
      type: String,
      require: true
    },
    createdDate: {
      type: Number,
      require: true
    },
    latitude: {
      type: Number,
      require: true
    },
    longitude: {
      type: Number,
      require: true
    },
    city: {
      type: String,
      require: true
    }
});
