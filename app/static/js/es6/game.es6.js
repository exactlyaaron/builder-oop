/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#dashboard').on('click', '#plant',plant);
    $('#dashboard').on('click', '#getforest', getForest);
    $('#dashboard').on('click', '#sellwood', sellWood);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
  }

  function sellWood(event){
    var userId = $('#user').attr('data-id');
    var amount = $('#sellamount').val();
    ajax(`/user/${userId}/sellwood`, 'put', {amount:amount}, html => {
      $('#dashboard').empty().append(html);
    });

    event.preventDefault();
  }

  function chop(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');

    ajax(`/trees/${treeId}/chop`, 'put', null, html =>{
      tree.replaceWith(html);

      console.log(treeId);
      var username = $('#username').val();
      var userId = $('#user').attr('data-id');

      ajax(`/dashboard/${userId}`, 'get', null, html =>{
        $('#dashboard').empty().append(html);
      });

    });
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, html =>{
      tree.replaceWith(html);
    });
  }

  function getForest(){
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, html =>{
      $('#forest').append(html);
    });
  }

  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, html =>{
      $('#forest').append(html);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, html => {
      $('#dashboard').empty().append(html);
      $('#forest').empty();
    });
  }

  function ajax(url,type, data={}, success= r =>console.log(r), dataType='html'){
    $.ajax({
      url:url,
      type: type,
      dataType: dataType,
      data: data,
      success:success
    });
  }

})();
