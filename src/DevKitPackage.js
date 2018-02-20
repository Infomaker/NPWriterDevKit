import './scss/index.scss'
import DevKitComponent from './DevKitComponent'

export default {
    name: 'npwriterdevkit', // TODO: Edit...
    id: 'se.infomaker.npwriterdevkit', // TODO: Edit...

    // The configure() is called by the writer when it wants the
    // plugin to initalize itself and its different parts.
    configure: function(config, pluginConfig) {

        // Add plugin to main sidebar (can be overriden in plugin config)
        config.addToSidebar('main', pluginConfig, DevKitComponent)

        // Add translations for the plugin
        config.addLabel('newsvalue', {
            en: 'Devkit plugin loaded',
            sv: 'Devkit plugin inläst'
        })
    }
}
