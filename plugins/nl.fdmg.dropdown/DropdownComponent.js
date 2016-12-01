const Component = require('substance/ui/Component')
const Icon = require('substance/ui/FontAwesomeIcon')
const $$ = Component.$$
const _ = require('lodash')

export default DropdownComponent


function DropdownComponent() {
    DropdownComponent.super.apply(this, arguments)
}

DropdownComponent.Prototype = function() {

    /*
     onSelect
     header
     items
     allowEmptySelection
     allowFreeInput
     disabled
     initialSelection
     */

    this.getInitialState = function() {
        const selection = this.props.initialSelection || {id: 'default', label: ''}
        const listmode = !(this.props.allowFreeInput && !this.props.items.some((item) => selection.label == item.label) && selection.label != '')

        return {
            listmode,
            selection
        }
    }

    this.render = function() {

        const toggleButton = $$('button')
            .addClass('input-toggle')
            .append($$(Icon, {icon: this.state.listmode ? 'fa-pencil' : 'fa-list-ul'}))
            .on('click', this.toggleListmode.bind(this))

        const items = this.props.items.slice()

        items.unshift({
            id: 'none',
            label: this.context.i18n.t('- no selection -'),
            disabled: !this.props.allowEmptySelection
        })

        const listselect = $$('select')
            .setId('listselect')
            .attr(this.props.disabled ? {disabled: 'disabled'}: {})
            .append(

                items.map((item) =>
                    $$('option')
                        .append(item.label)
                        .attr({
                            'data-id': item.id,
                            disabled: item.disabled,
                            selected: item.disabled || (this.state.selection.label == item.label)
                        })
                )

            )
            .ref('listselect')
            .on('change', function(e) {
                const listselect = this.refs.listselect.$el
                const option = listselect.find('option:selected')

                this.update({
                    id: option.data('id'),
                    label: option.val()
                })
            }.bind(this))

        const freeinput = $$('input')
            .addClass('form-control free-input')
            .attr(this.props.disabled ? {disabled: 'disabled'}: {})
            .attr({
                value: this.state.selection.id != 'none' ? this.state.selection.label : '',
                placeholder: this.context.i18n.t('free input'),
                type: 'text'
            })
            .ref('freeinput')
            .on('blur', function() {
                const label = this.refs.freeinput.val()
                const id = this.findIdForLabel(label, 'unknown')

                this.update({
                    id,
                    label,
                    freeinput: true
                })
            }.bind(this))

        const showList = this.state.listmode || !this.props.allowFreeInput
        const body = showList ? listselect : freeinput

        return $$('div')
            .addClass('fdmg-sidebar')
            .append(
                $$('div')
                    .addClass('header')
                    .append(
                        $$('h2').append(this.props.header),
                        this.props.allowFreeInput ? toggleButton : ''
                    ),
                $$('div')
                    .addClass('form-group')
                    .append(body)
            )
    }

    this.toggleListmode = function() {
        this.extendState({listmode: !this.state.listmode})
    }

    this.update = function(selection) {
        if (!_.isEqual(this.state.selection, selection)) {

            if (this.props.onSelect) {
                this.props.onSelect(selection)
            }

            this.extendState({selection})
        }
    }

    this.findIdForLabel = function(label, orElse = -1) {
        const item = this.props.items.find((i) => i.label == label)

        if (item != undefined) {
            return item.id
        }

        return orElse
    }
}

Component.extend(DropdownComponent)
module.exports = DropdownComponent
