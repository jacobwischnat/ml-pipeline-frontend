import React from 'react';
import {UserService} from '../../services/users';
import {useAuthService} from '../../services/auth';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Login from '../Login';
import Landing from '../Landing';

const App = () => {
    const {token} = useAuthService();

    return <UserService serverUrl="" token={token}>
        <BrowserRouter>
            <Switch>
                {
                    token
                        ? <Redirect to="/app"/>
                        : <Route exact path="/" component={Login}/>
                }
                <Route path="/app" component={Landing}/>
            </Switch>
        </BrowserRouter>
    </UserService>;
};

export default App;