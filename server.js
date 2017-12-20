
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');


var app = express();
var PORT = process.env.PORT || 8080;


var db = require("./models");

app.use(express.static("public"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



