import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'

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
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', themeColor: color })
        }
    }
}

ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)


export default ThemeSwitch