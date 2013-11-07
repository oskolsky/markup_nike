$(function() {

  $('.form').customForm();

  $('.form_input.__date').mask('99/99/9999');
  $('.form_input.__phone').mask('(999) 999-9999');
  $('.form_input.__card').mask('9999999999999');

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

  $('#cycle').cycle({
    fx: 'scrollHorz',
    speed: 250,
    timeout: 0,
    swipe: true,
    slides: '.slider_i',
    pager: '.slider_pager',
    pagerTemplate: ''
  });

  $('#cycle').on('cycle-before', function(event, opts) {
    $('section.__slider_more').hide();
    $('.slider_i_more').text('Подробнее');
  });

  $('.slider_i_more').click(function() {
    var rel = $(this).attr('rel');
    if ($('section.__slider_more.__' + rel).is(':hidden')) {
      $('section.__slider_more.__' + rel).slideDown();
      $(this).text('Закрыть');
    } else {
      $('section.__slider_more.__' + rel).slideUp();
      $(this).text('Подробнее');
    }
    return false;
  });

  //
  // .. Custom select
  //
  $('.form_select').each(function() {
    var select = $(this).find('li[data-select="select"]');
    var value  = $(this).find('li[data-select="select"]').data('value');
    $(this).find('p').text(select.text());
    $(this).find('input[type="hidden"]').val(value);
  });
  $('.form_select').hover(function() {
    $(this).find('ul').show();
  }, function() {
    $(this).find('ul').hide();
  });
  $('.form_select').find('li').click(function() {
    var value = $(this).data('value');
    var parent = $(this).closest('.form_select');
    $(this).attr('data-select', 'select');
    parent.find('li').removeAttr('data-select');
    parent.find('p').text($(this).text());
    parent.find('input[type="hidden"]').val(value);
    parent.find('ul').hide();
  });

});