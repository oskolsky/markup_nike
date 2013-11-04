$(function() {

  $('.form').customForm();

  $('#open-rules').click(function() {
    $('#rules').is(':hidden') ? $('#rules').slideDown() : $('#rules').slideUp();
    $('html, body').animate({scrollTop: $('#rules').offset().top}, 500);
    return false;
  });

  $('#close-rules').click(function() {
    $('#rules').slideUp();
    $('html, body').animate({scrollTop: $('#card').offset().top}, 500);
    return false;
  });

  $('#open-feedback').click(function() {
    $('#feedback').is(':hidden') ? $('#feedback').slideDown() : $('#feedback').slideUp();
    $('html, body').animate({scrollTop: $('#contacts').offset().top}, 500);
    return false;
  });

});