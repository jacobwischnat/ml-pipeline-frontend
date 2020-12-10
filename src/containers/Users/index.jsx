import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {
    Button,
    Typography,
} from '@material-ui/core';

import Table from '../../components/Table';
import {useUserService} from '../../services/users';

const Wrapper = styled.div`
    padding: 10px 10px 10px 10px;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Users = () => {
    const history = useHistory();
    const {users, getUsers} = useUserService();

    useEffect(() => {
        getUsers();
    }, []);

    const headings = [
        {
            label: 'Email',
            field: 'email'
        },
        {
            label: 'Status',
            field: 'active'
        }
    ];

    return <Wrapper>
        <Flex>
            <Typography variant="h4">Users</Typography>
            <Button
                color="primary"
                variant="contained"
                onClick={() => history.push('/app/users/create')}>Create Invite</Button>
        </Flex>
        <Table
            options={{canDelete: true}}
            headings={headings}
            data={users}/>
    </Wrapper>;
};

export default Users;