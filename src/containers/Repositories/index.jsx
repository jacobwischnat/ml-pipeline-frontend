import React from 'react';
import {Switch, Route} from 'react-router-dom';

import * as instance from './Instance';
import {RepoEntriesService} from '../../services/repository/instance/entries';

const Repositories = () => <RepoEntriesService serverUrl="">
    <Switch>
        <Route path="/app/repositories/instance" exact component={instance.List}/>
        <Route path="/app/repositories/instance/add" exact component={instance.Add}/>
        <Route path="/app/repositories/instance/edit/:id" exact component={instance.Edit}/>
        <Route path="/app/repositories/instance/browse/:id/:path?" exact component={instance.Browse}/>
        <Route path="/app/repositories/instance/create/:repositoryId" exact component={instance.Create}/>
    </Switch>
</RepoEntriesService>;

export default Repositories;