import React from 'react';
import logo from './logo.svg';
import './App.css';

function App(): JSX.Element {
    const a = '111';
    React.useEffect(() => {
        console.log('000');
    });
    return (
        <div className="App">
            <header className="App-header">
                <div id="alarmInfoBtn" style={{ width: 100, height: 100, background: 'red' }}></div>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
