import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import {AuthService} from './services/auth';

ReactDOM.render(<AuthService serverUrl=""><App/></AuthService>, document.querySelector('.root'));