import './scss/index.scss'
import DevKitComponent from './DevKitComponent'

export default {
    name: 'npwriterdevkit', //EDIT ME
    id: 'se.infomaker.npwriterdevkit', //EDIT ME
    configure: function(config) {
        config.addComponentToSidebarWithTabId(this.id, 'main', DevKitComponent)
    },


    /*
     * Optional, but recommended properties.
     * Edit all of these to your liking
     */
    title: 'Newspilot Writer Devkit',
    description: `A description of this plugin`,
    version: '{{version}}', // Don't change, will be changed in build
    organization: 'Infomaker Scandinavia AB',
    website: 'https://github.com/Infomaker/NPWriterDevKit',
    tags: [],
    authors: [
        {
            name: 'You name',
            email: 'your@email.com'
        }
    ]
}
