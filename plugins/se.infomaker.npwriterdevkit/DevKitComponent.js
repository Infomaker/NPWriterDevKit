const {Component} = substance
// const {api} = writer

class DevKitComponent extends Component {

    /**
     * Method called when component is disposed and removed from DOM
     */
    dispose() {
        // Perfect place to remove eventlisteners etc
    }

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
    }


    /**
     *
     * @returns {{clickCount: number}}
     */
    getInitialState() {
        return {
            clickCount: 0
        }
    }


    /**
     * Render method is called whenever there's a change in state or props
     * @param $$
     * @returns {*}
     */
    render($$) {
        const el = $$('div')

        el.append($$('h2').append(this.getLabel('Devkit plugin loaded')))
        el.append($$('p').append(String(this.state.clickCount)))

        let clickCount = this.state.clickCount

        let button = $$('button').on('click', () => {
            this.setState({
                clickCount: clickCount+1
            })
        }).append('Click me')

        el.append(button)

        return el
    }
}
export default DevKitComponent