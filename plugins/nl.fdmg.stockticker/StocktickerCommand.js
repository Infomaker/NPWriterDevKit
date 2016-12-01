import {InsertInlineNodeCommand} from 'substance'
import {api} from 'writer'

class StocktickerCommand extends InsertInlineNodeCommand {
    getCommandState(params) {
        if (!params) return

        var sel = params.selection
        var newState = {
            disabled: true,
            active: false
        };

        if (sel && !sel.isNull() && sel.isPropertySelection()) {
            newState.disabled = false;
        }

        return newState;
    }

    createNodeData(params) {
        return {
            attributes: {'data-isin-code': 'US0378331005'},
            targets: [],
            label: '???',
            type: 'stockticker',
            dataType: 'fdmg/stockticker',
            isin: 'US0378331005',
            exchange: ''
        }
        // api.document.insertInlineNode('stockticker', {
        //     type: 'stockticker',
        //     dataType: 'fdmg/stockticker',
        //     isin: '',
        //     exchange: ''
        // });
    }
}
export default StocktickerCommand