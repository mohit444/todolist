const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://admin-mohit:Justgo-123@cluster0.kzigndr.mongodb.net/todolist", {useNewUrlParser : true});

const todoSchema = new mongoose.Schema({
  name : String
});

const TodoModel = mongoose.model("todos", todoSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){

  const day = date.getDate();

  TodoModel.find({}, function(err, foundlist){
    if(err){
      console.log(err);
    }
    else{
      // console.log(foundlist);
      res.render("index", {finalday:day, todoItems:foundlist});
    }
  });

});

app.post("/", function(req, res){
  const item = req.body.newItem;
  console.log(item);

  const data = new TodoModel({name:item});
  data.save();
  // listItems.push(item);
  res.redirect("/");
});

app.post("/delete", function(req , res){
  // console.log(req.body.checkbox);
  TodoModel.findByIdAndRemove(req.body.checkbox, function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.listen("3000", function(){
  console.log("Server is running on port 3000!");
});

// admin-mohit
// Justgo-123
