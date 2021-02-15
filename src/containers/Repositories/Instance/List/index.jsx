import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Typography, Button, Card, CardContent} from '@material-ui/core';

import Table from '../../../../components/Table';
import Icon from '@mdi/react';
import {icons} from '../../../../constants';
import { useRepoService } from '../../../../services/repository';
import { useHistory } from 'react-router-dom';

const Repositories = () => {
    const history = useHistory();
    const {instances, getInstances} = useRepoService();

    useEffect(() => {
        (() => getInstances())();
    }, []);

    return <Wrapper size={10}>
        <Card>
            <CardContent>
                <Typography variant="h4">Repositories</Typography>
                <Right>
                    <Button
                        variant="contained"
                        onClick={() => history.push('/app/repositories/instance/add')}
                        color="secondary">Add</Button>
                </Right>
                <Table
                    headings={[
                        {
                            render: row => <Icon size={1} path={icons[row.repository.icon]}/>
                        },
                        {field: 'repository.name', label: 'Type'},
                        {field: 'name', label: 'Name'},
                        {field: 'description', label: 'Description'},
                        {
                            render: row => <A href={`/app/repositories/instance/browse/${row.id}/%2f`}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => history.push(`/app/repositories/instance/browse/${row.id}/%2f`)}
                                    color="primary">Browse</Button>
                            </A>
                        },
                        {
                            render: row => <A href={`/app/repositories/instance/edit/${row.id}`}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => history.push(`/app/repositories/instance/edit/${row.id}`)}
                                    color="secondary">Edit</Button>
                            </A>
                        }
                    ]} data={instances}></Table>
            </CardContent>
        </Card>
    </Wrapper>;
};

const A = styled.a`
    text-decoration: none;
`;

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const Wrapper = styled.div`
    width: 100%;
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

export default Repositories;