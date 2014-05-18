/* jshint unused:false */

var audioChop, audioBeanstalk;

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#dashboard').on('click', '#plant',plant);
    $('#dashboard').on('click', '#getforest', getForest);
    $('#dashboard').on('click', '#showhouse', showHouse);
    $('#dashboard').on('click', '#sellwood', sellWood);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutoGrow);
    $('#dashboard').on('click', '#purchase-autoseed', purchaseAutoSeed);
    $('#dashboard').on('click', '#purchase-autoroot', purchaseAutoRoot);

    preloadAssets();

    $('#house-wrapper').hide();
  }

  function showHouse(){
    $('#forest').fadeOut();
    $('#house-wrapper').fadeIn();
  }



  function purchaseAutoGrow(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}/purchase/autogrow`, 'put', null, html => {
      $('#items').empty().append(html);

      ajax(`/dashboard/${userId}`, 'get', null, html =>{
        $('#dashboard').empty().append(html);
      });
    });
  }

  function purchaseAutoSeed(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}/purchase/autoseed`, 'put', null, html => {
      $('#items').empty().append(html);

      ajax(`/dashboard/${userId}`, 'get', null, html =>{
        $('#dashboard').empty().append(html);
      });
    });
  }

  function purchaseAutoRoot(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}/purchase/autoroot`, 'put', null, html => {
      $('#items').empty().append(html);

      ajax(`/dashboard/${userId}`, 'get', null, html =>{
        $('#dashboard').empty().append(html);
      });
    });
  }

  function preloadAssets(){
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chopping.mp3';
    audioBeanstalk = $('<audio>')[0];
    audioBeanstalk.src = '/audios/beanstalk.mp3';
  }

  function sellWood(event){
    var userId = $('#user').attr('data-id');
    var amount = $('#sellamount').val();
    ajax(`/users/${userId}/sellwood`, 'put', {amount:amount}, html => {
      $('#dashboard').empty().append(html);

    });

    event.preventDefault();
  }

  function chop(){
    audioChop.play();
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');

    ajax(`/trees/${treeId}/chop/${userId}`, 'put', null, html =>{
      tree.replaceWith(html);

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
    ajax(`/trees/${treeId}/grow`, 'put', null, html => {
      tree.replaceWith(html);
      if($(html).hasClass('beanstalk')){
        audioBeanstalk.play();
      }
    });
  }

  function getForest(){
    $('#house-wrapper').fadeOut();
    $('#forest').fadeIn();
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, html => {
      $('#forest').empty().append(html);
    });
  }

  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, html => {
      $('#forest').append(html);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, html => {
      $('#dashboard').empty().append(html);
      //$('#items').empty().append(html);
      getForest();

      var userId = $('#user').attr('data-id');

      ajax(`/items/${userId}`, 'get', null, html => {
        $('#items').empty().append(html);
      });
    });
  }

})();

function ajax(url,type, data={}, success= r =>console.log(r), dataType='html'){
  'use strict';

  $.ajax({
    url:url,
    type: type,
    dataType: dataType,
    data: data,
    success:success
  });
}
