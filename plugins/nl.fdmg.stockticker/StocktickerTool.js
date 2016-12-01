import {Tool} from 'substance'
import {api} from 'writer'

class StocktickerTool extends Tool {
    render($$) {
        return $$('button')
            .addClass('se-tool')
            .append($$('i').addClass('fa fa-line-chart'))
            .on('click', this.onClick)
    }

    onClick() {
        api.editorSession.executeCommand('stockticker')
    }
}
export default StocktickerTool
