const express = require("express");
const bodyParser = require("body-parser");

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    const date = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    const currentDay = date.toLocaleDateString("en-US", options); 

   res.render("list", {listTitle: currentDay, lists: items});
});

app.post("/", function(req, res){
    const item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
     
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", lists: workItems});
});

app.listen("3000", function(){
    console.log("Server is running on port on 3000");
});