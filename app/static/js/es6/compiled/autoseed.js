(function() {
  'use strict';
  init();
  function init() {
    $('#autoseed').click(seed);
  }
  var isOn = false;
  var timer;
  function seed() {
    isOn = !isOn;
    $('#autoseed.item').toggleClass('on');
    if (isOn === true) {
      $('#autoseed.item').css('background-image', 'url("/img/autoseed.gif")');
    } else {
      $('#autoseed.item').css('background-image', 'url("/img/autoseed.jpg")');
    }
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(autoplant, 1000);
  }
  function autoplant() {
    var ids = $('.alive:not(.beanstalk)').toArray();
    if (ids.length < 50) {
      var userId = $('#user').attr('data-id');
      ajax('/trees/plant', 'post', {userId: userId}, (function(html) {
        $('#forest').append(html);
      }));
    }
  }
})();

//# sourceMappingURL=autoseed.map
