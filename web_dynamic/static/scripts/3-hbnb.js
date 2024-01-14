#!/usr/bin/node

$(function () {
  $('input[type=checkbox]').on('click', function () {
    const amenList = [];
    $('input:checked').each(function () {
      amenList.push($(this).attr('data-name'));
    });
    $('.amenities h4').text(amenList.join(', '));
    if (amenList.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });

  function checkAPI () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (places) {
        const section = $('.places');
        section.empty();

        places.forEach(function (place) {
          const article = $('<article></article>');

          const name = $('<h2></h2>').text(place.name);
          article.append(name);

          const price = $('<div></div>').text('Price: $' + place.price_by_night);
          article.append(price);

          section.append(article);
        });

        $('#api_status').addClass('available');
      },
      error: function () {
        $('#api_status').removeClass('available');
      }
    });
  }

  checkAPI();
  setInterval(checkAPI, 15000);
});
