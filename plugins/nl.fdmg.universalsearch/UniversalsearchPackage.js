import './scss/universalsearch.scss'
import {registerPlugin} from 'writer'
import UniversalSearchComponent from './UniversalSearchComponent'

const universalsearchPackage = {
    id: 'nl.fdmg.universalsearch',
    name: 'universalsearch',
    configure: (config) => {

        config.addComponent('universalsearch', UniversalSearchComponent)

    }
}

export default () => {
    if (registerPlugin) {
        registerPlugin(universalsearchPackage)
    } else {
        console.error("Register method not yet available");
    }
}


