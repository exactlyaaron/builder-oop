var audioChop,
    audioBeanstalk;
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', getForest);
    $('#dashboard').on('click', '#sellwood', sellWood);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutoGrow);
    $('#dashboard').on('click', '#purchase-autoseed', purchaseAutoSeed);
    preloadAssets();
  }
  function purchaseAutoGrow() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autogrow"), 'put', null, (function(html) {
      $('#items').empty().append(html);
      ajax(("/dashboard/" + userId), 'get', null, (function(html) {
        $('#dashboard').empty().append(html);
      }));
    }));
  }
  function purchaseAutoSeed() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autoseed"), 'put', null, (function(html) {
      $('#items').empty().append(html);
      ajax(("/dashboard/" + userId), 'get', null, (function(html) {
        $('#dashboard').empty().append(html);
      }));
    }));
  }
  function preloadAssets() {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chopping.mp3';
    audioBeanstalk = $('<audio>')[0];
    audioBeanstalk.src = '/audios/beanstalk.mp3';
  }
  function sellWood(event) {
    var userId = $('#user').attr('data-id');
    var amount = $('#sellamount').val();
    ajax(("/users/" + userId + "/sellwood"), 'put', {amount: amount}, (function(html) {
      $('#dashboard').empty().append(html);
    }));
    event.preventDefault();
  }
  function chop() {
    audioChop.play();
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');
    ajax(("/trees/" + treeId + "/chop/" + userId), 'put', null, (function(html) {
      tree.replaceWith(html);
      var username = $('#username').val();
      var userId = $('#user').attr('data-id');
      ajax(("/dashboard/" + userId), 'get', null, (function(html) {
        $('#dashboard').empty().append(html);
      }));
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(html) {
      tree.replaceWith(html);
      if ($(html).hasClass('beanstalk')) {
        audioBeanstalk.play();
      }
    }));
  }
  function getForest() {
    var userId = $('#user').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(html) {
      $('#forest').empty().append(html);
    }));
  }
  function plant() {
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId: userId}, (function(html) {
      $('#forest').append(html);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(html) {
      $('#dashboard').empty().append(html);
      getForest();
      var userId = $('#user').attr('data-id');
      ajax(("/items/" + userId), 'get', null, (function(html) {
        $('#items').empty().append(html);
      }));
    }));
  }
})();
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}

//# sourceMappingURL=game.map
