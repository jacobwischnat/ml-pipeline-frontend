import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {UserService} from '../../services/users';
import {RepoService} from '../../services/repository';
import {useAuthService} from '../../services/auth';

import Login from '../Login';
import Invite from '../Invite';
import Landing from '../Landing';

const App = () => {
    const {token} = useAuthService();

    return <UserService serverUrl="" token={token}>
        <RepoService serverUrl="">
            <Switch>
                <Route path="/app" component={Landing}/>
                <Route exact path="/" component={Login}/>
                <Route exact path="/invite/:uuid" component={Invite}/>
            </Switch>
            <ToastContainer
                closeOnClick
                style={{marginTop: '64px'}}
                newestOnTop={true}
                position="top-right"
                autoClose={5000}/>
        </RepoService>
    </UserService>;
};

export default App;