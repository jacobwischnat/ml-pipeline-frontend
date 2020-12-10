import React from 'react';

import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {Card, Typography, Button, Avatar} from '@material-ui/core';

import Table from '../../components/Table';
import {useAuthService} from '../../services/auth';
import {useUserService} from '../../services/users';

const Wrapper = styled.div`
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Account = () => {
    const history = useHistory();
    const {swap} = useAuthService();
    const {account, accounts, getMe} = useUserService();
    const headings = [
        {
            label: 'Icon',
            render: row => <Avatar src={row?.icon ? `/api/file/${row.icon}` : null}/>
        },
        {
            label: 'Name',
            field: 'name'
        },
        {
            label: 'Switch',
            render: row => (row.id !== account.id)
                ? <Button
                    variant="contained"
                    color="primary"
                    onClick={() => swap(row.id).then(() => getMe())}>Switch</Button>
                : null,
        }
    ];

    return <Wrapper size={10}>
        <Card>
            <Wrapper size={20}>
                <Flex>
                    <Typography variant="h4">Accounts</Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => history.push('/app/account/create')}>Create Account</Button>
                </Flex>
                <Table headings={headings} data={accounts}/>
            </Wrapper>
        </Card>
    </Wrapper>;
};

export default Account;