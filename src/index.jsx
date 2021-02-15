import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import {AuthService} from './services/auth';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <AuthService serverUrl="">
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AuthService>,
    document.querySelector('.root')
);