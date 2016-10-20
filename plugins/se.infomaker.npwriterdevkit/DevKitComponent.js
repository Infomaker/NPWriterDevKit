const {Component} = substance
// const {api} = writer

class DevKitComponent extends Component {

    dispose() {
        // Perfect place to remove eventlisteners etc
    }

    constructor(...args) {
        super(...args)
    }

    getInitialState() {
        return {
            clickCount: 0
        }
    }

    render($$) {
        const el = $$('div')

        el.append($$('h2').append('Devkit plugin loaded'))
        el.append($$('p').append(String(this.state.clickCount)))

        let clickCount = this.state.clickCount

        let button = $$('span').on('click', () => {
            this.setState({
                clickCount: clickCount+1
            })
        }).append('Click me')

        el.append(button)
        return el
    }
}
export default DevKitComponent