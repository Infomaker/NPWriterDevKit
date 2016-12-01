import DropdownComponent from './DropdownComponent'

const dropdownPackage = {
    id: 'nl.fdmg.dropdown',
    name: 'dropdown',
    configure: (config) => {

        config.addComponent('dropdown', DropdownComponent)

    }
}

export default () => {
    if (registerPlugin) {
        registerPlugin(dropdownPackage)
    } else {
        console.error("Register method not yet available");
    }
}


