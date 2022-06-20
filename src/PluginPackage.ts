import './scss/index.scss'
import {MainComponent} from './MainComponent'

type PluginConfiguration = {
    enabled: true
    id: string
    mandatory: boolean
    name: string
    style: string
    url: string
    // Update data to whatever fits
    data?: {
        baseUrl: string
    }
}

export const PluginPackage = {
    name: 'npwriterdevkit', // TODO: Change "npwriterdevkit" to your plugin name
    id: 'se.infomaker.npwriterdevkit', // TODO: Change this id to you id

    // The configure() is called by the writer when it wants the
    // plugin to initalize itself and its different parts.
    configure: function(config: DWConfigurator, pluginConfig: PluginConfiguration) {

        // Add plugin to main sidebar (can be overriden in plugin config)
        config.addToSidebar('main', pluginConfig, MainComponent)

        // Add translations for the plugin
        config.addLabel('Devkit plugin loaded', {
            en: 'Devkit plugin loaded',
            sv: 'Devkit plugin inläst'
        })

        config.addLabel('Click me', {
            en: 'Click me',
            sv: 'Klicka här'
        })

        config.addLabel('Number of clicks', {
            en: 'Number of clicks',
            sv: 'Antal klick'
        })
    }
}
