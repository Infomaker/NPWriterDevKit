import {Tool} from 'substance'
import {api} from 'writer'

class StocktickerInlineTool extends Tool {

    render($$) {

        const node = this.props.node;
        const el = $$('div');

        if (node) {

            const SearchComponent = api.ui.getComponent('universalsearch')

            el.addClass('se-tool sc-stockticker-inline-tool')
                .append(
                    $$(SearchComponent, {
                        doSearch: this.performSearch.bind(this),
                        onSelect: this.onSelect.bind(this),
                        value: node.name
                    })
                )
                .on('keydown', this.onKeydown);
        }

        return el

    }

    getNode() {
        var doc = this.context.doc;
        if (this.props.annotationId) {
            return doc.get(this.props.annotationId);
        }
    }

    // Get focus on the input when the stockticker is inserted.
    didMount() {
        setTimeout(() => {
            // this.el.find('.sc-stockticker-inline-tool #formSearch').focus()
        }, 50);
    }

    onKeydown(e) {
        if (e.keyCode === 27 /* escape */) {
            this.send('closeAnnotationTool');
        }
    }

    performSearch(query, callback) {

        this.props.node.search(query, (error, result) => {
            callback(null, result)
        })
    }

    onSelect(quote) {
        api.editorSession.transaction((tx) => {
            tx.set([this.props.node.id, 'name'], quote.name)
            tx.set([this.props.node.id, 'symbol'], quote.symbol)
            tx.set([this.props.node.id, 'isin'], quote.isin)
            tx.set([this.props.node.id, 'exchange'], quote.exchange)
            tx.set([this.props.node.id, 'currency'], quote.currency)
            tx.set([this.props.node.id, 'price'], quote.price)
            tx.set([this.props.node.id, 'difference'], quote.difference)
        })
    }
}

export default StocktickerInlineTool