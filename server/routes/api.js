const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
const request = require('request');
let db;
// CONNECT
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) return console.log(err);
    db = client.db('training')
});

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};
// Response handling
let response = {
  status: 200,
  data: [],
  token: null,
  message: '',
  id: ''
};

//user
router.post('/register', function(req,res,next) {
      db.collection('users').insertOne(req.body).then(user => {
        console.log("Successfully registered!");
        response.data = user;
        response.status = 200;
        res.json(response);
      }).catch((err) => {
        sendError(err, res);
      })
        .catch(err => {
          response.status = 500;
          res.json(response);
        });
});
router.post('/login',function(req,res) {
  db.collection('users').findOne({username: req.body.username}).then(function (found) {
    if (found) {
        if(req.body.password === found.password){
          response.status = 200;
          response.message = found.username;
          response.id = found._id;
          response.token = generateJwt(found);
          res.json(response);
        }
        else{
          response.status = 401;
          res.json(response);
        }
    }
    else {
      response.data = false;
      response.status = 404;
      res.json(response);
    }
  })
    .catch(err =>{
      response.status = 500;
      response.data = false;
      response.message = "Došlo je do pogreške u radu sa serverom!";
      res.json(response);
    });
});
generateJwt = function(found){

  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    name: found.firstname + " " + found.lastname,
    exp: parseInt(expiry.getTime() / 1000),
  }, "Secret");
};

router.get('/user',function(req,res) {
  console.log(req.headers.user);
  db.collection('users').findOne({username: req.headers.user}).then(function (found) {
        console.log(found);
        response = found;
        res.json(response);
  })
    .catch(err =>{
      response.status = 500;
      response.data = {};
      response.message = "Došlo je do pogreške u radu sa serverom!";
      res.json(response);
    });
});

router.route('/excercises')
  .get(function(req,res){
    db.collection('excercises')
      .find()
      .toArray()
      .then((result) => {
        response.data = result;
        res.json(response.data);
      })
      .catch((error) => {
      })
  })
  .post(function(req,res){
    db.collection('excercises')
      .insertOne(req.body)
      .then(document => {
        console.log("Vježba uspješno dodana");
        response.data = document;
        response.status = 200;
        res.json(response);
      })
      .catch(error => {
        response.status = 500;
        console.log("Došlo je do pogreške prilikom dodavanja vježbe!");
        res.json(response);
      })
  })
  .put(function(req,res){
    db.collection('excercises')
      .update(
        {
          _id:ObjectID(req.body._id)
        }
        ,
        {
         name: req.body.name,
         type: req.body.type,
         difficulty: req.body.difficulty
        })
      .catch(error => {
        sendError(error);
      });
  })
  .delete(function(req,res){
    db.collection('excercises')
      .remove({_id: ObjectID(req.headers._id)})
      .then(document => {
        response.status = 200;
        response.message = "Uspješno brisanje vježbe!";
        res.json(response);
      })
      .catch(error => {
        sendError(error);
      });
  });

router.route('/user/excercise')
  .get(function(req,res){
    db.collection('userexcercises')
      .find({idUser:ObjectID(req.headers._id)})
      .toArray()
      .then(result =>{
        response.data = result;
        res.json(response);
        response.status = 200;
      })
      .catch(error => {
        setError(error);
        response.status = 500;
      });
  })
  .post(function(req,res){
    db.collection('userexcercises')
      .insertOne({idUser:ObjectID(req.body.idUser),idEx:ObjectID(req.body.idEx)})
      .then(result => {
        response.status = 200;
        response.message = "Vježba uspješno pridružena korisniku!";
        res.json(response);
      })
      .catch(error => {
        console.log(error);
        response.status = 500;
      });
  })
  .delete(function(req,res){
    db.collection('userexcercises')
      .remove({$and: [{idUser: ObjectID(req.headers.iduser)},{idEx: ObjectID(req.headers.idex)}]})
      .then(result => {
        response.status = 200;
        response.message = "Uspješno brisanje vježbe za korisnika";
        res.json(response);
      })
      .catch(error =>{
        sendError(error);
        response.status = 500;
        res.json(response);
      });
  });


module.exports = router;
