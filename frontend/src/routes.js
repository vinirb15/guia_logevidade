import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/logon" component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/house/:id" exact component={Profile} />
                <Route path="/update/:id" exact component={UpdateProfile} />
            </Switch>
        </BrowserRouter>
    )
}