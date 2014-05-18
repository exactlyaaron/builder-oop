(function() {
  'use strict';
  init();
  function init() {
    $('#autogrow').click(grow);
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autogrow.item').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growing, 500);
  }
  function growing() {
    var ids = $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/grow"), 'put', null, (function(html) {
        tree.replaceWith(html);
        if ($(html).hasClass('beanstalk')) {
          audioBeanstalk.play();
        }
      }));
    }));
  }
})();

//# sourceMappingURL=autofunctions.map
