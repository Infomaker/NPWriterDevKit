import './scss/index.scss'
import DevKitComponent from './DevKitComponent'

export default {
    name: 'npwriterdevkit', //EDIT ME
    id: 'se.infomaker.npwriterdevkit', //EDIT ME
    configure: function (config) {
        config.addComponentToSidebarWithTabId(this.id, 'main', DevKitComponent)
    }
}