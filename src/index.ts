import {PluginPackage} from './PluginPackage'
import {registerPlugin} from 'writer'

(() => {
    // Register the plugin with the Writer when registerPlugin() is available
    if(registerPlugin) {
        registerPlugin(PluginPackage)
    }
    else {
        console.error('Register method not yet available')
    }
})()
