import {InlineNode} from 'substance'
import {api} from 'writer'

class StocktickerNode extends InlineNode {

    fetchPayload(context, cb) {

        /**
         * "<quote>
         <name>Apple Inc</name>
         <shortname>Apple Inc</shortname>
         <price>104,00</price>
         <difference>-0,84%</difference>
         <absdifference>-0,89</absdifference>
         <currency>€</currency>
         <date>2016-12-01T09:25:58+01:00</date>
         <id>150176547</id>
         <isin>US0378331005</isin>
         <ticker>APC</ticker>
         <exchange>FRAA</exchange>
         <url>https://beurs.fd.nl/noteringen/150176547/apple-inc/koersen</url>
         </quote>
         * @type {number}
         */

        let maxresults = 100;

        const serviceUrl = api.getConfigValue('nl.fdmg.stockticker', 'serviceurl');
        const searchUrl = encodeURIComponent(serviceUrl + this.isin);
        api.router.get('/api/resourceproxy', {url: searchUrl})
            .then(response => response.text())
            .then(xmlString => {
                const parser = new DOMParser()
                const xml = parser.parseFromString(xmlString, 'text/xml')
                let quote = xml.querySelector('quote')

                cb(null, {
                    name: quote.querySelector('name').textContent,
                    symbol: quote.querySelector('ticker').textContent,
                    isin: quote.querySelector('isin').textContent,
                    exchange: quote.querySelector('exchange').textContent,
                    currency: quote.querySelector('currency').textContent,
                    price: quote.querySelector('price').textContent,
                    difference: quote.querySelector('difference').textContent
                })

            })
            .catch((error) => {
                cb(error)
            })
    }


    search(query, callback, maxresult) {

        const serviceUrl = api.getConfigValue('nl.fdmg.stockticker', 'serviceurl');
        const searchUrl = encodeURIComponent(serviceUrl + query);
        api.router.get('/api/resourceproxy', {url: searchUrl})
            .then(response => response.text())
            .then(xmlString => {
                const parser = new DOMParser()
                const xml = parser.parseFromString(xmlString, 'text/xml')
                let quotes = xml.querySelectorAll('quote')

                let results = Array.prototype.map.call(quotes, (quote) => {
                    return {
                        name: quote.querySelector('name').textContent,
                        symbol: quote.querySelector('ticker').textContent,
                        isin: quote.querySelector('isin').textContent,
                        exchange: quote.querySelector('exchange').textContent,
                        currency: quote.querySelector('currency').textContent,
                        price: quote.querySelector('price').textContent,
                        difference: quote.querySelector('difference').textContent
                    }
                })

                callback(null, results)

            })
            .catch((error) => {
                callback(error)
            })
    }
}


StocktickerNode.isResource = true

StocktickerNode.define({
    type: 'stockticker',
    dataType: 'string',
    isin: 'string',
    exchange: 'string',
    name: {type: 'string', optional: true},
    symbol: {type: 'string', optional: true},
    difference: {type: 'string', optional: true},
    price: {type: 'string', optional: true},
    currency: {type: 'string', optional: true},
    errorMessage: {type: 'string', optional: true}
})

export default StocktickerNode