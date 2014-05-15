/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');


exports.login = (req, res)=>{
  User.login(req.body.username, user=>{
    res.render('users/dashboard', {user:user});
  });
};

exports.dashboard = (req, res)=>{
  User.findUserById(req.params.userId, user=>{
    user.save(()=>{
      res.render('users/dashboard', {user:user});
    });
  });
};

exports.sellwood = (req, res)=>{
  console.log('MADE IT TO NODE');
  User.findUserById(req.params.userId, user=>{
    user.sell(req.body.amount, ()=>{
      res.render('users/dashboard', {user:user});
    });
  });
};
