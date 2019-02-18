import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div id="container">
                <TodoList/>
            </div>
        );
    }
}

class TodoItems extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        let todoEntries = this.props.entries;
        function createTasks(item){
            return <li key={item.key}>{item.text}</li>
        }
        let listItems = todoEntries.map(createTasks);
        return (
            <ul className='theList'>
                {listItems}
            </ul>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this)
    }

    addItem(e) {
        const itemArray = this.state.items;
        itemArray.push({
            text: this._inputElement.value,
            key: Date.now()
        });
        this.setState({
            items: itemArray
        });
        this._inputElement.value = '';
        e.preventDefault();
        console.log(itemArray);

    }

    render() {
        return (
            <div className='todoListMain'>
                <div className='header'>
                    <form>
                        <input ref={(a) => this._inputElement = a} placeholder="enter task">
                        </input>
                    </form>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItems entries={this.state.items} />
            </div>
        )
    }
}

export default App;
