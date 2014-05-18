'use strict';

var traceur = require('traceur');
var _ = require('lodash');
var Tree = traceur.require(__dirname + '/../models/tree.js');
var User = traceur.require(__dirname + '/../models/user.js');


exports.plant = (req, res)=>{
  Tree.plant(req.body.userId, tree=>{
    res.render('trees/tree', {tree:tree});
  });
};

exports.getForest = (req, res)=>{
  Tree.findAllByUserId(req.query.userId, trees=>{
    res.render('trees/forest', {trees:trees});
  });
};

exports.grow = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    tree.grow();
    tree.save(()=>{
      res.render('trees/tree', {tree:tree});
    });
  });
};

exports.autogrow = (req, res)=>{
  Tree.findAllByUserId(req.params.userId, trees=>{
    console.log(trees);
    _(trees).forEach((tree)=>{
      tree.grow();
      tree.save(()=>{
        res.render('trees/tree', {tree:tree});
      });
    });
  });
};


exports.chop = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    User.findUserById(req.params.userId, user=>{
      tree.chop(user);
        tree.save(()=>{
          user.save(()=>{
            res.render('trees/tree', {tree:tree});
          });
        });
    });
  });
};

exports.root = (req, res)=>{

  Tree.findByTreeId(req.params.treeId, tree=>{
    console.log('---NODEEE----EXPORTS.ROOT');
    console.log(tree);

    tree.root(tree._id, ()=>{
      res.render('trees/tree', {tree:tree});
    });
    // tree.save(()=>{
    //   res.render('trees/tree', {tree:tree});
    // });
  });


  // Tree.findByTreeId(req.params.treeId, tree=>{
  //   User.findUserById(req.params.userId, user=>{
  //     tree.chop(user);
  //       tree.save(()=>{
  //         user.save(()=>{
  //           res.render('trees/tree', {tree:tree});
  //         });
  //       });
  //   });
  // });
};
