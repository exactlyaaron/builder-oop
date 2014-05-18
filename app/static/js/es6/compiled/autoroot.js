(function() {
  'use strict';
  init();
  function init() {
    $('#autoroot').click(root);
  }
  var isOn = false;
  var timer;
  function root() {
    isOn = !isOn;
    $('#autoroot.item').toggleClass('on');
    if (isOn === true) {
      $('#autoroot.item').css('background-image', 'url("/img/autoroot.gif")');
    } else {
      $('#autoroot.item').css('background-image', 'url("/img/autoroot.jpg")');
    }
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(autoroot, 1000);
  }
  function autoroot() {
    console.log('autoroot');
    var ids = $('.dead').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/root"), 'delete', null, (function(html) {
        console.log(html);
        tree.remove();
      }));
    }));
  }
})();

//# sourceMappingURL=autoroot.map
