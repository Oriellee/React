import React, {Component} from 'react';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div id="container">
                <TodoList/>
            </div>
        );
    }
}

class CreateTasks extends React.Component {
    constructor(props) {
        super(props);
        this.delSelf = this.delSelf.bind(this);
        this.isChecked = this.isChecked.bind(this);

    }

    delSelf() {
        let data = this.props.data;
        this.props.del(data);
    }

    isChecked(e) {
        let data = this.props.data;
        this.props.checked(data);
    }

    render() {
        let data = this.props.data;
        let clear = {
            clear: "both"
        };
        return <li key={data.key}>
            <input type="checkbox" value={data.checked} checked={data.checked} onChange={(e) => {
                this.isChecked(e)
            }}/>
            <span className={data.checked ? "lineThrough" : ""}>{data.text}</span>
            <button onClick={this.delSelf}>x</button>
            <div style={clear}></div>
        </li>
    }
}

class TodoItems extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let todoEntries = this.props.entries;
        let del = this.props.delItem;
        let checked = this.props.checkedItem;

        return (
            <ul className='theList'>
                {
                    todoEntries.map((item) => <CreateTasks checked={checked} del={del} data={item} key={item.key}/>)
                }
            </ul>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            finished: 0
        };
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.checkedItem = this.checkedItem.bind(this);
    }

    addItem(e) {
        const itemArray = this.state.items;
        if(this._inputElement.value !== ""){
            itemArray.push({
                text: this._inputElement.value,
                key: Date.now(),
                checked: false
            });
            this.setState({
                items: itemArray
            });
            this._inputElement.value = '';
            e.preventDefault();
        }
    }

    delItem(item) {
        const itemArray = this.state.items;
        let obj = [], sum = 0;
        itemArray.forEach((value) => {
            if (value.key !== item.key) {
                obj.push(value);
                if (value.checked === true) {
                    sum++;
                }
            }
        });
        this.setState({
            items: obj,
            finished: sum
        });
    }

    checkedItem(item) {
        const itemArray = this.state.items;
        let sum = 0;
        itemArray.forEach((value) => {
                if (value.key === item.key) {
                    value.checked = !item.checked;
                }
                if (value.checked === true) {
                    sum++;
                }
            }
        );
        this.setState({
            finished: sum
        });
    }

    render() {
        return (
            <div className='todoListMain'>
                <p>今天做什么呢？</p>
                <div className='header'>
                    <input ref={(a) => this._inputElement = a} placeholder="请输入">
                    </input>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItems checkedItem={this.checkedItem} delItem={this.delItem} entries={this.state.items}/>
                <div className='todoStatus'>总数/已完成：{this.state.items.length}/{this.state.finished}</div>
            </div>
        )
    }
}

export default App;
