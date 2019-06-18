import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import TestContainer from './TestContainer';
import PlayerContainer from './PlayerContainer';
import SongListDetailContainer from './SongListDetailContainer';

export default class extends Component {
    render() {
        return (
            <div className='componentApp'>
                <div className='routerPageBox'>
                    <Switch>
                        <Route path="/home" component={HomeContainer} />
                        <Route path="/test" component={TestContainer} />
                        <Route path="/songListDetail/:id" component={SongListDetailContainer} />
                    </Switch>
                </div>
                <PlayerContainer />
            </div>
        )
    }
}
