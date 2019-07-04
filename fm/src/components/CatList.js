
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from "react-router-dom";
import ListRow from './ListRow';


export default class extends Component {
    render() {
        return (
            <div className='typeList'>
                <div className='inner'>
                    {
                        this.props.list.map((item, index) =>
                            <ListRow key={index} item={item} index={index} {...this.props} />
                        )
                    }
                </div>
            </div>
        )
    }
}
