'use strict';

var $ = require('substance/util/jquery');

function VWDUtil() {
}

VWDUtil.prototype.search = function(url, callback, maxresults) {
  if (typeof maxresults === 'undefined') maxresults = 100;

  jQuery.ajax({
    url: url,
    dataType: 'xml'
  }).done(function(data) {
    var quotes = [];
    var i = 0;

    $(data).find('quote').each(function() {
      if (++i === maxresults) return false;
      quotes.push(parse(this))
    });

    callback(null, quotes);
  }).error(function(err) {
    callback(err, null);
  });

  function parse(quote) {
    return {
      name: $('name', quote).text() + ' (' + $('exchange', quote).text() + ')',
      id: $('isin', quote).text(),
      tickerName: $('name', quote).text(),
      symbol: $('ticker', quote).text(),
      price: $('price', quote).text(),
      difference: $('difference', quote).text(),
      absdifference: $('absdifference', quote).text(),
      currency: $('currency', quote).text(),
      isin: $('isin', quote).text(),
      exchange: $('exchange', quote).text()
    };
  }
};

module.exports = VWDUtil;
