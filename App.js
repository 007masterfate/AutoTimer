var monitor = require('active-window');
var express = require('express');
var app = express();
const duration = require('pendel');
var fs = require('fs');
const {
  log
} = require('console');


let edit = (nam, s_time, e_time, time_data, w_name) => {
  let bool = true;
  var new_entry = {
    "tab_name": nam,
    "start_time": s_time,
    "end_time": e_time,
    "hours": time_data.hours,
    "minutes": time_data.minutes,
    "seconds": time_data.seconds
  }

  fs.readFile('activity.json', (err, d) => {
    if (err) throw err;
    let data = JSON.parse(d);
    let ar = data.activities;
    var arrayFound = data.activities.filter(function (item) {
      if (item.name == w_name) {
        item.entries.push(new_entry);
        bool = false;
      }
    });

    if (bool == true) {
      var entry = []
      entry.push(new_entry);
      var obj = {
        name: w_name,
        entries: entry
      }
      ar.push(obj);
    }

    data.activities = ar;


    fs.writeFile("activity.json", JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log('complete');
    })

  });
}





let gtime = () => {
  var date_ob = new Date();
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  var dateTime = hours + ":" + minutes + ":" + seconds;
  return dateTime;
}


var prev = "";
var pt = "";
global.data = {}
data.activities = []
fs.writeFile("activity.json", JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('complete');
})

callback = function (window) {
  try {
    console.log("App: " + window.app);
    if (prev == "") {
      prev = window.app;
      global.st = gtime();
      pt = window.title;
    } else {
      if (window.app != prev) {
        global.et = gtime();
        getTime = duration.time(st, et);
        edit(pt, st, et, getTime, prev);
        prev = window.app;
        pt = window.title;
        global.st = gtime();
        console.log("window changed");
      } else {
        if (window.app == prev && window.title == pt) {} else {
          console.log("Same window but different title");
          tab_et = gtime();
          getTime = duration.time(st, tab_et);
          edit(pt, st, tab_et, getTime, prev);
          pt = window.title;
          global.st = gtime();
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

monitor.getActiveWindow(callback, -1, 1);


// var express = require('express');
// var app = express();
// var path = require('path');
// var PORT = 3000;

// // Without middleware
// app.get('/', function (req, res) {
//   var options = {
//     root: path.join(__dirname)
//   };

//   var fileName = 'Hello.txt';
//   res.sendFile(fileName, options, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log('Sent:', fileName);
//     }
//   });
// });

// app.listen(PORT, function (err) {
//   if (err) console.log(err);
//   console.log("Server listening on PORT", PORT);
// });