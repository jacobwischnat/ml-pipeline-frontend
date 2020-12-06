import Icon from '@mdi/react'
import styled from 'styled-components';
import {mdiPipe} from '@mdi/js';
import {useAuthService} from '../../services/auth';
import React, {useState} from 'react';
import {TextField, Typography, Button} from '@material-ui/core';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 250px;
    height: 200px;
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

const Login = () => {
    const {authenticate} = useAuthService();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = ({target: {value}}) => setEmail(value);
    const handlePassword = ({target: {value}}) => setPassword(value);

    return <Wrapper>
        <Banner>
            <Typography variant="h4">ML Pipeline</Typography>
            <Icon path={mdiPipe} size={2.5}/>
        </Banner>
        <LoginBox>
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
            <Button
                color="primary"
                variant="contained"
                onClick={() => authenticate(email, password)}>Login</Button>
        </LoginBox>
    </Wrapper>;
}

export default Login