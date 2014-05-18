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
    }
  }
}

module.exports = Item;
