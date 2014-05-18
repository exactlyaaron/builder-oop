'use strict';

var trees = global.nss.db.collection('trees');
//var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  get isAdult(){
    return this.height >= 48;
  }

  get isBeanstalk(){
    return (this.height / 12) >= 100;
  }

  get isChoppable(){
    return this.isAdult && this.isHealthy && !this.isBeanstalk && !this.isChopped;
  }

  get isGrowable(){
    return this.isHealthy && !this.isBeanstalk && !this.isChopped;
  }

  get classes(){
    var classes = [];
    if(this.height === 0){
      classes.push('seed');
    } else if(this.height < 24) {
      classes.push('sapling');
    } else if(!this.isAdult) {
      classes.push('treenager');
    } else {
      classes.push('adult');
    }


    if(!this.isHealthy){
      classes.push('dead');
    } else {
      classes.push('alive');
    }

    if(this.isChopped){
      classes.push('chopped dead');
    }

    if(this.isBeanstalk){
      classes.push('beanstalk');
    }

    return classes.join(' ');

  }

  grow(){
    var max = this.isAdult ? this.height * 0.1 : 2;
    this.height += _.random(0, max, true);

    var deathMax = this.isAdult ? (200-(this.height/12)*0.1) : 200;

    if(deathMax < 10){
      deathMax = 10;
    }

    this.isHealthy = _.random(0,deathMax, true) > 1;
  }

  // chop(fn){
  //   var userId = Mongo.ObjectID(this.userId);
  //   var tree = this;
  //   this.isChopped = true;
  //
  //   users.findOne({_id: userId}, (err, user)=>{
  //     tree.isChopped = true;
  //     user.wood += (tree.height / 2);
  //
  //     users.save(user, ()=>{
  //       fn();
  //     });
  //   });
  //
  // }

  chop(user){
    user.wood += this.height / 2;
    this.height = 0;
    this.isChopped = true;
    this.isHealthy = false;
  }

  root(treeId, fn){
    trees.findAndRemove({_id: treeId},()=>{
      fn();
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

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((err, objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));
      fn(forest);
    });
  }

}

module.exports = Tree;
