import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'

class Content extends Component {
    render() {
        return (
            <div>
                <h1>React.js小书内容</h1>
                <ThemeSwitch />
            </div>

        )
    }
}

export default Content