$(function() {

  $('#open-rules').click(function() {
    $('.section.__rules').is(':hidden') ? $('.section.__rules').slideDown() : $('.section.__rules').slideUp();
    return false;
  });

  $('#close-rules').click(function() {
    $('.section.__rules').slideUp();
    return false;
  });

});