import React from 'react';
import styled from 'styled-components';
import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';

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

const Create = () => {
    return <Wrapper>
        <Typography variant="h4">Create Invite</Typography>
        <Form>
            <TextField
                variant="outlined"
                label="Email Address"></TextField>
            <Button color="secondary" variant="contained">Send Invite</Button>
        </Form>
    </Wrapper>
};

export default Create;