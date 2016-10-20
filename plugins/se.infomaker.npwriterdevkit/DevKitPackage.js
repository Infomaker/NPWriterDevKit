import DevKitComponent from './DevKitComponent'

export default {
    name: 'npwriterdevkit',
    id: 'se.infomaker.npwriterdevkit',
    configure: function (config) {
        config.addComponentToSidebarWithTabId(this.id, 'main', DevKitComponent)
    }
}