import './scss/index.scss'
import DevKitComponent from './DevKitComponent'

export default {
    name: 'npwriterdevkit', //EDIT ME
    id: 'se.infomaker.npwriterdevkit', //EDIT ME
    configure: function (config) {
        config.addComponentToSidebarWithTabId(this.id, 'main', DevKitComponent)
    },


    /*
     * Optional but recommended properties
     *
     */
    title: 'Newspilot Writer Devkit',  //EDIT ME
    description: `A description of this plugin`,  //EDIT ME
    organization: 'Infomaker Scandinavia AB',  //EDIT ME
    website: 'https://github.com/Infomaker/NPWriterDevKit',
    tags: [],
    authors: [
        {
            name: "You name",
            email: "your@email.com"
        }
    ]

}