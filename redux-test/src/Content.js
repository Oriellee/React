import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import {connect} from './connect'

class Content extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    render() {
        return (
            <div>
                <h1 style={{ color: this.props.themeColor }}>React.js小书内容</h1>
                <ThemeSwitch />
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
Content = connect(mapStateToProps)(Content)

export default Content