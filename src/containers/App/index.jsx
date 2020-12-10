import React from 'react';
import {UserService} from '../../services/users';
import {useAuthService} from '../../services/auth';
import {Switch, Route} from 'react-router-dom';

import Login from '../Login';
import Invite from '../Invite';
import Landing from '../Landing';

const App = () => {
    const {token} = useAuthService();

    return <UserService serverUrl="" token={token}>
        <Switch>
            <Route path="/app" component={Landing}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/invite/:uuid" component={Invite}/>
        </Switch>
    </UserService>;
};

export default App;