import DevkitPackage from './DevKitPackage'
import {registerPlugin} from 'writer'

(() => {
    if (registerPlugin) {
        registerPlugin(DevkitPackage)
    } else {
        console.error("Register method not yet available");
    }
})()


