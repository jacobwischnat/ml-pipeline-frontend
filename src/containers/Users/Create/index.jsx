import React, {useState} from 'react';

import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {CircleLoader} from 'react-spinners';
import {useUserService} from '../../../services/users';

const Wrapper = styled.div`
    padding: 10px 10px 10px 10px;
`;

const Form = styled.div`
    display: flex;
    padding-top: 20px;
    min-height: 120px;
    width: 400px;
    flex-direction: column;
    justify-content: space-between;
`;

const Error = styled.strong`
    font-weight: bold;
    color: red;
`;

const Create = () => {
    const history = useHistory();
    const {invite, loading, error} = useUserService();
    const [email, setEmail] = useState('');

    const handleEmail = ({target: {value}}) => setEmail(value);

    return <Wrapper>
        <Typography variant="h4">Create Invite</Typography>
        <Form>
            <TextField
                value={email}
                variant="outlined"
                onChange={handleEmail}
                label="Email Address"></TextField>
            { error && <Error>{error}</Error> }
            {
                loading
                    ? <CircleLoader loading={loading}/>
                    : <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => invite(email).then(() => history.push('/app/users'))}>Send Invite</Button>
            }
        </Form>
    </Wrapper>
};

export default Create;