/* jshint unused:false */

/* global ajax, audioBeanstalk, audioChop */

(function(){
  'use strict';

  init();

  function init(){
    $('#autogrow').click(grow);
    //$('#maxheight').val('10');
    slider();
  }

  function slider(){

    $('#slider').noUiSlider({
    	start: [ 20 ],
    	range: {
    		'min': [   5 ],
    		'max': [ 9999 ]
    	},
      serialization: {
    		lower: [
    		// Write the values to
    		// an input with id 'field'
    			$.Link({
    				target: $('#value')
    			})
    		],
    		format: {
    		// Set formatting
    			decimals: 0,
    			postfix: 'ft'
    		}
    	}
    });

  }

  var isOn = false;
  var timer;

  function grow(){
    isOn = !isOn;
    $('#autogrow.item').toggleClass('on');

    if(isOn === true){
      $('#autogrow.item').css('background-image', 'url("/img/autogrow.gif")');
    } else {
      $('#autogrow.item').css('background-image', 'url("/img/autogrow.jpg")');
    }

    if(isOn){
      start();
    } else {
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(growing, 500);
  }

  function growing(){

    var ids = $('.alive:not(.beanstalk)').map((i,d)=>$(d).attr('data-id')).each((i,v)=>{

      var tree = $(`.tree[data-id=${v}]`);

      ajax(`/trees/${v}/grow`, 'put', null, html =>{
        tree.replaceWith(html);

        if($(html).hasClass('beanstalk')){
          audioBeanstalk.play();
        } else if(!$(html).hasClass('dead')) {
          autoChop(tree);
        }
      });
    });
  }

  function autoChop(tree){
    var height = parseFloat($(tree).children().children().first().text());

    var maxHeight = parseFloat($('#value').val());

    if(height > maxHeight){

      var treeId = tree.attr('data-id');
      var userId = $('#user').attr('data-id');

      ajax(`/trees/${treeId}/chop/${userId}`, 'put', null, html =>{
        tree.replaceWith(html);

        ajax(`/dashboard/${userId}`, 'get', null, html =>{
          $('#dashboard').empty().append(html);
        });
      });
    }
  }

})();
