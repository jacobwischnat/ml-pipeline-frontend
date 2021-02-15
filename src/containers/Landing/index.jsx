import {icons} from '../../constants';

const {
    mdiMenu,
    mdiServer,
    mdiAccount,
    mdiExitRun,
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
} = icons;

import {
    List,
    Drawer,
    AppBar,
    Avatar,
    Toolbar,
    ListItem,
    Collapse,
    Typography,
    ListItemText,
    ListItemIcon,
    ListSubheader,
} from '@material-ui/core';
import {StyledMenu, StyledMenuItem} from '../../components/StyledMenu';

import Icon from '@mdi/react';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';

import Users from '../Users';
import CreateUser from '../Users/Create';
import {useUserService} from '../../services/users';

import Account from '../Account';
import CreateAccount from '../Account/Create';

import Repositories from '../Repositories';

import Project from '../Project';

const Wrapper = styled.div`
    flexGrow: 1;
    height: 100%;
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
    const {avatar, user, account, getMe} = useUserService();
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);

    const go = path => () => history.push(path);

    const onClose = () => setOpen(false);

    const handleUserOpen = ({target}) => setAnchor(target);
    const handleUserClose = () => setAnchor(null);
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
    };

    useEffect(() => {
        getMe();
    }, []);

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
                        onClick={go('/app/account')}
                        onClose={onClose}/>
                    <Item
                        name="Projects"
                        icon={mdiScriptOutline}
                        onClick={go('/app/project')}
                        onClose={onClose}/>

                    <ListSubheader>Pipeline</ListSubheader>
                    <Item
                        name="Repositories"
                        icon={mdiSourceRepository}
                        onClick={go('/app/repositories/instance')}
                        onClose={onClose}/>
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
                    <Avatar
                        src={avatar ? `/api/file/${avatar}` : null}
                        style={{cursor: 'pointer'}}
                        onClick={handleUserOpen}
                        />
                    <StyledMenu
                        keepMounted
                        open={!!anchor}
                        anchorEl={anchor}
                        onClose={handleUserClose}>
                        <StyledMenuItem>
                            <ListItemIcon>
                            <Avatar
                                style={{width: '25px', height: '25px'}}
                                src={avatar ? `/api/file/${avatar}` : null}/>
                            </ListItemIcon>
                            <ListItemText>{user?.name} (User)</ListItemText>
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <Avatar
                                    style={{width: '25px', height: '25px'}}
                                    src={account?.icon ? `/api/file/${account.icon}` : null}/>
                            </ListItemIcon>
                            <ListItemText>{account?.name} (Account)</ListItemText>
                        </StyledMenuItem>
                        <StyledMenuItem
                            onClick={() => handleLogout()}>
                            <ListItemIcon>
                                <Icon path={mdiExitRun} size={1}/>
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </StyledMenuItem>
                    </StyledMenu>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/app/users" exact component={Users}/>
                <Route path="/app/users/create" exact component={CreateUser}/>
                <Route path="/app/account" exact component={Account}/>
                <Route path="/app/account/create" exact component={CreateAccount}/>
                <Route path="/app/repositories" component={Repositories}/>
                <Route path="/app/project" exact component={Project}/>
            </Switch>
        </Wrapper>
    </React.Fragment>
};

export default () => <Landing/>;