$(function() {

  // Form init
  $('.form').customForm();

  // Format money
  $('.js-format-money').each(function() {
    var value = $(this).text();
    $(this).text(parseInt(value).formatMoney());
  });

  // Mask input
  $('.form_input.__date').mask('99/99/9999');
  $('.form_input.__phone').mask('(999) 999-9999');
  $('.form_input.__card').mask('9999999999999');

  // Global send form
  $('.js-send-form').click(function() {
    alert('Тут обработчик AJAX запроса');
    return false;
  });

  // Open rules section
  $('#open-rules').click(function() {
    $('#rules').is(':hidden') ? $('#rules').slideDown() : $('#rules').slideUp();
    $('html, body').animate({scrollTop: $('#rules').offset().top}, 500);
    return false;
  });

  // Close rules section
  $('#close-rules').click(function() {
    $('#rules').slideUp();
    $('html, body').animate({scrollTop: $('#card').offset().top}, 500);
    return false;
  });

  // Open & close feedback section
  $('#open-feedback').click(function() {
    if ($('#feedback-form').is(':hidden')) {
      $('#feedback-form').slideDown();
    } else {
      alert('Тут обработчик AJAX запроса');
      $('#feedback-form').slideUp();
    }
    $('html, body').animate({scrollTop: $('#feedback').offset().top}, 500);
    return false;
  });

  // Menu
  $('#menu').find('a').click(function() {
    var el = $(this).attr('href');
    $('html, body').animate({scrollTop: $(el).offset().top}, 500);
    return false
  });

  // Slider init
  $('#cycle').cycle({
    fx: 'scrollHorz',
    speed: 250,
    timeout: 0,
    swipe: true,
    slides: '.slider_i',
    pager: '.slider_pager',
    pagerTemplate: ''
  });

  // Slider callback
  $('#cycle').on('cycle-before', function(event, opts) {
    $('section.__slider_more').hide();
    $('.slider_i_more').text('Подробнее');
  });

  // Slider show more for slide
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

  // Custom select
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

Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = c == undefined ? 0 : isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? " " : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}