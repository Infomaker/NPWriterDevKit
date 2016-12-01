import {Component} from 'substance'
import SpinnerComponent from './SpinnerComponent'

import {lodash} from 'writer'

class UniversalSearchComponent extends Component {

    constructor(...args) {
        super(...args)

        if (this.props.createAllowed && !this.props.onCreate) {
            console.warn('Creation of items is allowed but onCreate method is missing');
        }
        this.search = lodash.debounce(this._search, 300);
    }

    getInitialState() {
        return {
            items: [],
            currentSelectedIndex: 0,
            isSearching: false
        };
    }

    render($$) {
        var formGroup = $$('div')
            .addClass('form-group')
            .ref('formGroup');
        var searchInput = $$('input')
            .addClass('form-control')
            .addClass('form__search')
            .attr({
                autocomplete: 'off',
                type: 'text',
                id: 'formSearch',
                value: this.props.value,
                placeholder: this.props.placeholderText
            })
            .on('keyup', this.onKeyup)
            .ref('searchInput');
        var inlineIcon = $$(SpinnerComponent, {isSearching: this.state.isSearching});

        formGroup.append(inlineIcon, searchInput);

        var el = $$('div')
            .addClass('search__container')
            .ref('searchContainer');
        var list = $$('ul')
            .attr({id: 'searchResult'})
            .ref('searchResult');

        if (this.state.items.length > 0) {
            list.addClass('isSearching');
        }

        this.state.items.forEach(function (item, i) {
            var itemToSave = lodash.clone(item);
            var name = item.name;

            if (item.id === '__create-new') {
                name = this.getLabel('Create') + ': ' + name;
            }

            var itemId = 'item-' + item.id;
            var itemEl = $$('li');

            if (item.exists) {
                itemEl.addClass('item__exists');
                itemEl.append($$('span').append('\u2713').addClass('item__found'));
            }

            itemEl
                .append($$('span').append(name).addClass('item__name'))
                .attr({id: itemId})
                .on('click', function () {
                    this.select(itemToSave);
                }.bind(this));

            if (this.state.currentSelectedIndex === i) {
                this.currentSelectedItem = itemToSave;
                itemEl.addClass('active');
            }

            list.append(itemEl);
        }.bind(this));

        el.append(formGroup, list);

        return el;
    }

    onKeyup(e) {
        switch (e.keyCode) {
            case 38:  // up arrow
                if (e.shiftKey) return;
                e.preventDefault();
                this.prev();
                break;
            case 40:  // down arrow
                if (e.shiftKey) return;
                e.preventDefault();
                this.next();
                break;
            case 9:   // tab
            case 13:  // enter
                e.preventDefault();
                if (this.state.items.length === 0) return;
                this.select(this.currentSelectedItem);
                break;
            case 27:  // escape
                this.hide();
                break;
            default:
                this.search(this.refs.searchInput.val());
        }
    }

    select(item) {
        if (item.exists) {
            return;
        }

        if (this.props.onCreate && this.props.createAllowed && item.id === '__create-new') {
            this.props.onCreate(item, itemAlreadyExists(this.state.items, item));
        } else {
            this.props.onSelect(item);
        }

        this.hide();

        // TODO Replace with Array.(any|some)
        function itemAlreadyExists(items, item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id !== '__create-new') {
                    return true;
                }
            }
            return false;
        }
    }

    prev() {
        //noinspection JSJQueryEfficiency
        const selectedDomItem = document.getElementById('item-' + this.currentSelectedItem.uuid)
        let currentSelectedItem = this.currentSelectedItem && selectedDomItem
        if (currentSelectedItem) {
            let searchResultElement = this.refs.searchResult.el.el
            let selectedItemPrevSibling = selectedDomItem.previousSibling

            let items = this.state.items;
            if (this.state.currentSelectedIndex >= 0) {
                var idx = parseInt(this.state.currentSelectedIndex, 10)

                if (selectedItemPrevSibling === null) {
                    searchResultElement.scrollTop = searchResultElement.lastChild.offsetTop
                    this.extendState({
                        currentSelectedIndex: items.length - 1
                    });

                } else {
                    let offsetTop = selectedItemPrevSibling.offsetTop
                    let offsetHeight = selectedItemPrevSibling.offsetHeight

                    searchResultElement.scrollTop = offsetTop - offsetHeight
                    idx--;

                    this.extendState({
                        currentSelectedIndex: idx
                    });
                }
            }
        }
    }

    next() {
        const selectedDomItem = document.getElementById('item-' + this.currentSelectedItem.uuid)
        let currentSelectedItem = this.currentSelectedItem && selectedDomItem
        if (currentSelectedItem) {
            let searchResultElement = this.refs.searchResult.el.el;
            let selectedItem = selectedDomItem
            let items = this.state.items

            if (this.state.currentSelectedIndex >= 0) {
                let idx = parseInt(this.state.currentSelectedIndex, 10)
                idx++;

                searchResultElement.scrollTop = selectedItem.offsetTop;
                this.extendState({
                    currentSelectedIndex: idx
                });

                if (idx === items.length) {
                    this.extendState({
                        currentSelectedIndex: 0
                    });
                    searchResultElement.scrollTop = 0
                }
            }
        }
    }

    _search(query) {

        if (query.length === 0) {
            this.hide();
            return;
        }

        if (query.length < 2) {
            return;
        }

        this.extendState({isSearching: true});

        this.props.doSearch(query, function (err, items) {
            if (err) {
                console.error(err);
                return;
            }

            this.extendState({
                items: this.getItemsThatNotExisting(items),
                isSearching: false
            })
        }.bind(this));
    }

    hide() {
        this.refs.searchInput.val('');
        this.extendState({
            items: [],
            currentSelectedIndex: 0,
            isSearching: false
        });
    }

    getItemsThatNotExisting(items) {
        var existingItems = this.props.existingItems;

        if (this.props.onCreate && this.props.createAllowed) {
            items.push({
                name: this.refs.searchInput.val(),
                id: '__create-new'
            });
        }

        var existingItemsMap = {};
        if (existingItems) {
            existingItems.forEach(function (item) {
                existingItemsMap[item.name] = true;
            });
        }

        items.forEach(function (item) {
            if (existingItemsMap[item.name]) {
                item.exists = true;
            }
        })

        return items;
    }

}
export default UniversalSearchComponent