import './scss/stockticker.scss'

import {registerPlugin} from 'writer'

import StocktickerNode from './StocktickerNode'
import StockertickerConverter from './StocktickerConverter'
import StockertickerComponent from './StocktickerComponent'
import StocktickerTool from './StocktickerTool'
import StocktickerCommand from './StocktickerCommand'
import StocktickerInlineTool from './StocktickerInlineTool'
import StocktickerInlineCommand from './StocktickerInlineCommand'


const stocktickerPackage = {
    id: 'nl.fdmg.stockticker',
    name: 'stockticker',
    configure: (config) => {
        config.addNode(StocktickerNode)
        config.addConverter('newsml', StockertickerConverter)
        config.addComponent('stockticker', StockertickerComponent)

        config.addContentMenuTopTool('stockticker', StocktickerTool)
        config.addCommand('stockticker', StocktickerCommand, {nodeType: 'stockticker'})

        config.addOverlayTool('stocktickerinline', StocktickerInlineTool)
        config.addCommand('stocktickerinline', StocktickerInlineCommand, {nodeType: 'stockticker'})
    }
}

export default () => {
    if (registerPlugin) {
        registerPlugin(stocktickerPackage)
    } else {
        console.error("Register method not yet available");
    }
}


