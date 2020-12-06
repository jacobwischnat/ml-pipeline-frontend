import {
    mdiMenu,
    mdiServer,
    mdiChevronUp,
    mdiAccountBox,
    mdiChevronDown,
    mdiImageRemove,
    mdiGraphOutline,
    mdiScriptOutline,
    mdiImageMultiple,
    mdiTagPlusOutline,
    mdiAccountMultiple,
    mdiSourceRepository,
    mdiExpandAllOutline,
    mdiSwapVerticalVariant,
} from '@mdi/js';

import {
    List,
    Drawer,
    AppBar,
    Toolbar,
    ListItem,
    Collapse,
    Typography,
    ListItemText,
    ListItemIcon,
    ListSubheader,
} from '@material-ui/core';

import Icon from '@mdi/react';
import styled from 'styled-components';
import React, {useState} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';

import Users from '../Users';
import CreateUser from '../Users/Create';

const Wrapper = styled.div`
    flexGrow: 1;
`;

const Item = ({name, icon, onClick, children, onClose}) => {
    const [open, setOpen] = useState(false);
    return <React.Fragment>
        <ListItem button onClick={() => {
            if (children) setOpen(!open);
            else if (onClose) onClose();

            if (onClick) onClick();
        }}>
            <ListItemIcon>
                <Icon path={icon} size={1}/>
            </ListItemIcon>
            <ListItemText primary={name}/>
            { children && (open ? <Icon size={1} path={mdiChevronDown}/> : <Icon size={1} path={mdiChevronUp}/>) }
        </ListItem>
        { children && <Collapse in={open}>
            <List>
                { children }
            </List>
        </Collapse> }
    </React.Fragment>;
};

const Landing = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const go = path => () => history.push(path);
    const onClose = () => setOpen(false);

    return <React.Fragment>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <div style={{width: '250px', height: '100vh'}}>
                <List>
                    <ListSubheader>Organisation</ListSubheader>
                    <Item
                        name="Users"
                        icon={mdiAccountMultiple}
                        onClick={go('/app/users')}
                        onClose={onClose}/>
                    <Item
                        name="Accounts"
                        icon={mdiAccountBox}
                        onClick={null}
                        onClose={onClose}/>
                    <Item
                        name="Projects"
                        icon={mdiScriptOutline}
                        onClick={null}
                        onClose={onClose}/>

                    <ListSubheader>Pipeline</ListSubheader>
                    <Item name="Data Sources" icon={mdiSourceRepository} onClick={null}/>
                    <Item name="Data Sets" icon={mdiImageMultiple} onClick={null}>
                        <Item name="Manage" icon={mdiExpandAllOutline} onClick={null}/>
                        <Item name="Cleaning" icon={mdiImageRemove} onClick={null}/>
                        <Item name="Tagging" icon={mdiTagPlusOutline} onClick={null}/>
                        <Item name="Transforms" icon={mdiSwapVerticalVariant} onClick={null}/>
                    </Item>
                    <Item name="Compute" icon={mdiServer} onClick={null}/>
                    <Item name="Models" icon={mdiGraphOutline} onClick={null}/>
                </List>
            </div>
        </Drawer>
        <Wrapper>
            <AppBar position="static">
                <Toolbar>
                    <Icon
                        size={1.3}
                        path={mdiMenu}
                        style={{cursor: 'pointer', marginRight: '15px'}}
                        onClick={() => setOpen(!open)}/>
                    <Typography
                        variant="h6"
                        onClick={go("/app")}
                        style={{flexGrow: '1', cursor: 'pointer'}}
                        >ML Pipeline</Typography>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/app/users" exact component={Users}/>
                <Route path="/app/users/create" exact component={CreateUser}/>
            </Switch>
        </Wrapper>
    </React.Fragment>
};

export default Landing;