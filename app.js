const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const userScheme = new Schema({
                    name: String,                    
                    quantity: Array,
                    },
                    {versionKey: false});
const User = mongoose.model("user", userScheme);

const menuScheme = new Schema({name: String, age: Number, measure: String}, {versionKey: false});
const Menu = mongoose.model("menu", menuScheme);
 
app.use(express.static(__dirname + "/public"));


  // app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })

 
mongoose.connect("mongodb+srv://san:master9@cluster0.uksn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(5000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
 

 // User ------------------------------------------------s--
app.get("/api/user", function(req, res){
        
    User.find({}, function(err, users){
 
        if(err) return console.log(err);
        res.send(users)
    });
});
 
app.get("/api/user/:id", function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.post("/api/user", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const userName = req.body.name;
    // const userDish = req.body.dish;
    const userQuantity = req.body.quantity;
    // const userMeasure = req.body.measure;

    const user = new User({name: userName, quantity: userQuantity });
        
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});
     
app.delete("/api/user/:id", function(req, res){
         
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
                
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.put("/api/user", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userMeasure = req.body.measure;
    const newUser = {name: userName, age: userAge, measure: userMeasure};
     
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(user);
    });
});


// Menu ----------------------------------------------------
app.get("/api/menu", function(req, res){
        
    Menu.find({}, function(err, menus){
 
        if(err) return console.log(err);
        res.send(menus)
    });
});
 
app.get("/api/menu/:id", function(req, res){
         
    const id = req.params.id;
    Menu.findOne({_id: id}, function(err, menu){
          
        if(err) return console.log(err);
        res.send(menu);
    });
});
    
app.post("/api/menu", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const userName = req.body.name;
    const userAge = req.body.age;
    const userMeasure = req.body.measure;
    const menu = new Menu({name: userName, age: userAge, measure: userMeasure});
        
    menu.save(function(err){
        if(err) return console.log(err);
        res.send(menu);
    });
});
     
app.delete("/api/menu/:id", function(req, res){
         
    const id = req.params.id;
    Menu.findByIdAndDelete(id, function(err, menu){
                
        if(err) return console.log(err);
        res.send(menu);
    });
});
    
app.put("/api/menu", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userMeasure = req.body.measure;
    const newMenu = {name: userName, age: userAge, measure: userMeasure};
     
    Menu.findOneAndUpdate({_id: id}, newMenu, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(menu);
    });
});