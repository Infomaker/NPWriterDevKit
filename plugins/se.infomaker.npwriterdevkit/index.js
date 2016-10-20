import DevkitPackage from './DevKitPackage'
const {registerPlugin} = writer

export default () => {
    if (registerPlugin) {
        registerPlugin(DevkitPackage)
    } else {
        console.error("Register method not yet available");
    }
}


