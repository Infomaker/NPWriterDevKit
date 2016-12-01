import {EditInlineNodeCommand} from 'substance'

class StocktickerInlineCommand extends EditInlineNodeCommand {

    constructor(...args) {
        super(...args)
    }

    getCommandState(params) {
        let sel = params.selection
        let newState = {
            disabled: true,
            active: false
        }
        let annos = this._getAnnotationsForSelection(params)
        if (annos.length === 1 && annos[0].getSelection().equals(sel)) {
            newState.disabled = false
            newState.node = annos[0]
        }
        return newState
    }
}
export default StocktickerInlineCommand