var db = require("../models");
var path = require('path');
var jwt = require('jsonwebtoken');

var tmdb = require("../data/search").tmdb;
var utelly = require("../data/search").utelly;
var getGenre = require("../data/search").getGenre;

const SECRET = "supersecretkey";

module.exports = function (app) {

  //Creates a user with first name last name email and five favorite movies
  app.post("/api/users", function (req, res) {
    console.log('before insert into db: ', req.body);

    var userObject = {
      usernamef: req.body.unamef,
      usernamel: req.body.unamel,
      email: req.body.email,
      password: req.body.password,
      movie1: req.body.movie1,
      movie2: req.body.movie2,
      movie3: req.body.movie3,
      movie4: req.body.movie4,
      movie5: req.body.movie5,
    }
    db.user.create(userObject) //creates db object of user info
      .then(function (user) { //AFTER CREATION...

        if (!user) {
          return res.status(500).json({
            message: 'Internal server error'
          });
        }

        var token = jwt.sign({
          id: user.id
        }, SECRET);

        res.cookie('auth', token, {
          expires: new Date(Date.now() + (86400 * 14 * 1000)),
          maxAge: (86400 * 14 * 1000),
          httpOnly: true,
          secure: false
        });

        console.log("hello");
        res.send({
          redirect: '/profile.html'
        })

      });
  })

  //the login function which takes in first name last name and password
  app.post("/api/login", function (req, res) {
    console.log(req.body);

    db.user.findOne({
      where: {
        usernamef: req.body.unamef,
        usernamel: req.body.unamel,
        password: req.body.password
      }
    }).then(function (user) {

      if (!user) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      var token = jwt.sign({
        id: user.id
      }, SECRET);

      res.cookie('auth', token, {
        expires: new Date(Date.now() + (86400 * 14 * 1000)),
        maxAge: (86400 * 14 * 1000),
        httpOnly: true,
        secure: false
      });

      res.send({
        redirect: '/profile.html'
      });

    });

  });

  app.get("/api/profile", authCheck, function (req, res) {

    db.user.findById(req.decoded.id).then((user) => {

      res.status(200).json(user);

    });

  });

  //runs search function to retrieve random tv show then display source location via themoviedb and utelly api
  app.get("/api/search/:term", function (req, res) {
    var term = req.params.term;
    getGenre(term)
      .then(function (response) {
        var search = response.data.results[0].genre_ids[2] || response.data.results[0].genre_ids[1] || response.data.results[0].genre_ids[0];
        tmdb(search)
          .then(function (response) { //axios query to themovie db api, then pass response down to filter out a single random result
            //console.log(response);
            var pick = response.data.results[Math.floor(Math.random() * 19)];
            // console.log("****************************");
            console.log(pick.name);
            // console.log("****************************");
            utelly(pick.name, function (results) {
              console.log(results)
              res.json(results)
            })
          })
      })

  })

  //testing for show name and data returned from TMDB api
  app.get("/api/show/:name", function (req, res) {
    var name = req.params.name;
    getGenre(name)
      .then(function (response) {
        console.log(response.data.results[0]);
        console.log(response.data.results[0].genre_ids[0])
      })

  })

};


function authCheck(req, res, next) {

  var token = req.cookies.auth;

  jwt.verify(token, SECRET, function (err, decoded) {

    if (err) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    req.decoded = decoded;
    next();

  });

}