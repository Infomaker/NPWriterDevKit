import DevkitPackage from './DevKitPackage'
import {registerPlugin} from 'writer'

(() => {
    // Register the plugin with the Writer when registerPlugin() is available
    if (registerPlugin) {
        registerPlugin(DevkitPackage)
    }
    else {
        console.error('Register method not yet available')
    }
})()
