'use strict';

//Imports
var path = require('path')
var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');
var fs = require('fs')
var showdown = require('showdown');

//Defining variables
var my_path = path.join(path.resolve(__dirname, '..'))
var converter = new showdown.Converter()

//GET '/'
//Displays README.md
exports.index = function(req, res) {
  var filename = 'README.md'
  fs.readFile(my_path + '/views/' + filename, 'utf-8', function(err, data) {
    if (err)
      res.send(err);
    res.send(converter.makeHtml(data));
  });
  
}



exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  var taskId = mongoose.Types.ObjectId(req.params.taskId)
  Task.findById(taskId, function(err, task) {
    if (err) {
      res.send(err);
      console.log(taskId);
      return;
    }
    res.json(task);
    console.log("yay")
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};