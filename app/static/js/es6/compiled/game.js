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
  }
  function sellWood(event) {
    var userId = $('#user').attr('data-id');
    var amount = $('#sellamount').val();
    ajax(("/user/" + userId + "/sellwood"), 'put', {amount: amount}, (function(html) {
      $('#dashboard').empty().append(html);
    }));
    event.preventDefault();
  }
  function chop() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/chop"), 'put', null, (function(html) {
      tree.replaceWith(html);
      console.log(treeId);
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
    }));
  }
  function getForest() {
    var userId = $('#user').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(html) {
      $('#forest').append(html);
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
      $('#forest').empty();
    }));
  }
  function ajax(url, type) {
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
})();

//# sourceMappingURL=game.map
