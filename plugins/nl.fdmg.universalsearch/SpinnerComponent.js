import {Component} from 'substance'

class SpinnerComponent extends Component {

    render($$) {
        const el = $$('i').addClass('fa fa-spinner fa-spin form__search--spinner').ref('searchInputSpinner');

        if (this.props.isSearching) {
            el.addClass('active');
        }
        return el;
    }
}
export default SpinnerComponent