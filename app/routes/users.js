/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Item = traceur.require(__dirname + '/../models/item.js');


exports.login = (req, res)=>{
  User.login(req.body.username, user=>{
    console.log(user);
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

exports.items = (req, res)=>{
  User.findUserById(req.params.userId, user=>{
    user.save(()=>{
      res.render('users/items', {user:user});
    });
  });
};

exports.sellwood = (req, res)=>{
  console.log('MADE IT TO NODE');
  User.findUserById(req.params.userId, user=>{
    user.sell(req.body.amount, ()=>{
      user.save(()=>{
        res.render('users/dashboard', {user:user});
      });
    });
  });
};

exports.purchase = (req, res)=>{
  User.findUserById(req.params.userId, user=>{
    var item = new Item(req.params.item);
    user.purchase(item);
    user.save(()=>{
      res.render('users/items', {user:user});
    });
  });
};
