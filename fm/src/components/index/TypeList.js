import React, { Component } from 'react';

class TypeList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.map((item,index)=>
                    <div>
                        <p>liuxing</p>
                        
                    </div>
                    )
                }
            </div>
        )
    }
}
export default TypeList;