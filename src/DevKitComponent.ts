import {Component, SubstanceCreateElement} from 'substance'
import {UIButton} from 'writer'

class DevKitComponent extends Component {

    state: {
        clickCount: number
    }

    /**
     * Constructor
     * @param args
     */
    constructor(...args: ConstructorParameters<typeof Component>) {
        super(...args)
    }

    /**
     * Method called when component is disposed and removed from DOM
     */
    dispose() {
        // Perfect place to remove eventlisteners etc
    }

    /**
     * Return the inital component state before rendering
     *
     * @returns {{clickCount: number}}
     */
    getInitialState() {
        return {
            clickCount: 0
        }
    }

    /**
     * Do something after the first render
     */
    didMount() {
        console.log('Devkit plugin rendered')
    }

    /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
    render($$: SubstanceCreateElement) {
        const el = $$('div')
            .addClass('devkit')

        const button = $$(UIButton, {
            label: this.getLabel('Click me')
        })
            .on('click', () => {
                this.increaseClickCount()
            })

        el.append([
            $$('h2').append(
                this.getLabel('Devkit plugin loaded')
            ),
            $$('p').append(
                this.getLabel('Number of clicks') + `: ${this.state.clickCount}`
            ),
            button
        ])

        return el
    }

    /**
     * Increase click count by updating the state.
     *
     * The method extendState() perform a partial update of the state, if
     * you want to completely replace the state, use setState() instead.
     */
    increaseClickCount() {
        this.extendState({
            clickCount: this.state.clickCount + 1
        })
    }
}

export {DevKitComponent}
