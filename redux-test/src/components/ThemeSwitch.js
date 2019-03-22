import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    handleSwitchColor(color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.handleSwitchColor.bind(this, 'red')} style={{ color: this.props.themeColor }}>red</button>
                <button onClick={this.handleSwitchColor.bind(this, 'blue')} style={{ color: this.props.themeColor }}>blue</button>
            </div>
        )
    }
}

export default ThemeSwitch