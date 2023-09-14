// Require and call Express
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
require("dotenv").config();


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// use css
app.use(express.static("public"));

var server_port=process.env.SERVER_PORT || 8080

// placeholder tasks
var task = [];
var complete = [];

// add a task
app.post("/addtask", function(req, res) {
  var newTask = req.body.newtask;
  task.push(newTask);
  res.redirect("/");
});

// remove a task
app.post("/removetask", function(req, res) {
  var completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  }
  else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

// get website files
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

// listen for connections
app.listen(server_port, function() {
  console.log(`Testing app listening on port ${server_port}`)
});
