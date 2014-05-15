'use strict';

var trees = global.nss.db.collection('trees');
var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  getClass(){
    var classes = [];
    if(this.height === 0){
      classes.push('seed');
    } else if(this.height < 12) {
      classes.push('sapling');
    } else if(this.height < 24) {
      classes.push('treenager');
    } else {
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }

    if(this.isChopped){
      classes.push('chopped');
    }

    return classes.join(' ');

  }

  grow(){
    this.height += _.random(0,2);
    this.isHealthy = _.random(0,100) !== 70;
  }

  chop(fn){
    var userId = Mongo.ObjectID(this.userId);
    var tree = this;
    this.isChopped = true;

    users.findOne({_id: userId}, (err, user)=>{
      tree.isChopped = true;
      user.wood += (tree.height / 2);

      users.save(user, ()=>{
        fn();
      });
    });

  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
    var tree = new Tree(userId);
    trees.save(tree, ()=>{
      fn(tree);
    });
  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id: treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  // static findAllByUserId(userId, fn){
  //   userId = Mongo.ObjectID(userId);
  //   trees.find({userId:userId}).toArray((err, objs)=>{
  //     var forest = objs.map(o=>_.create(Tree.prototype, o));
  //     fn(forest);
  //   });
  // }

}

module.exports = Tree;
