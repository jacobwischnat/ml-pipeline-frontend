import Icon from '@mdi/react'
import styled from 'styled-components';
import {mdiPipe} from '@mdi/js';
import {useAuthService} from '../../services/auth';
import React, {useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {TextField, Typography, Button} from '@material-ui/core';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
`;

const InviteBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 250px;
    height: 300px;
    border: 1px solid #ccc;
    margin-bottom: 150px;
    padding: 10px 10px 10px;
`;

const Banner = styled.div`
    height: 120px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const Invite = () => {
    const {uuid} = useParams();
    const {token, accept} = useAuthService();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleName = ({target: {value}}) => setName(value);
    const handleEmail = ({target: {value}}) => setEmail(value);
    const handlePassword = ({target: {value}}) => setPassword(value);
    const handlePassword2 = ({target: {value}}) => setPassword2(value);

    return <Wrapper>
        {token && <Redirect to="/app"/>}
        <Banner>
            <Typography variant="h4">ML Pipeline</Typography>
            <Icon path={mdiPipe} size={2.5}/>
        </Banner>
        <InviteBox>
            <TextField
                variant="outlined"
                label="Name"
                value={name}
                onChange={handleName}></TextField>
            <TextField
                variant="outlined"
                label="Email"
                value={email}
                onChange={handleEmail}></TextField>
            <TextField
                variant="outlined"
                label="Password"
                type="password"
                value={password}
                onChange={handlePassword}></TextField>
            <TextField
                variant="outlined"
                label="Password Confirm"
                type="password"
                value={password2}
                onChange={handlePassword2}></TextField>
            <Button
                color="primary"
                variant="contained"
                disabled={(!name || !password || !password2 || password !== password2)}
                onClick={() => accept(name, email, password, uuid)}>Accept Invitation</Button>
        </InviteBox>
    </Wrapper>;
}

export default Invite;