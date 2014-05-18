'use strict';

class Item{
  constructor(type){
    this.type = type;

    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/autogrow.jpg';
        break;
      case 'autoseed':
        this.cost = 75000;
        this.image = '/img/autoseed.jpg';
        break;
      case 'autoroot':
        this.cost = 85000;
        this.image = '/img/autoroot.jpg';
        break;
    }
  }
}

module.exports = Item;
