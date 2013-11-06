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
    $('#feedback-form').is(':hidden') ? $('#feedback-form').slideDown() : $('#feedback-form').slideUp();
    $('html, body').animate({scrollTop: $('#feedback').offset().top}, 500);
    return false;
  });

  $('#menu').find('a').click(function() {
    var el = $(this).attr('href');
    $('html, body').animate({scrollTop: $(el).offset().top}, 500);
    return false
  });

});