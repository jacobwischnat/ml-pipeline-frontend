import Icon from '@mdi/react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import prettyBytes from 'pretty-bytes';
import {useHistory, useParams} from 'react-router-dom';
import React, { useEffect, useState, createRef } from 'react';
import { Card, Button, Divider, Typography, CardContent, ButtonGroup, TextField } from '@material-ui/core';

import {icons} from '../../../../constants';
import Table from '../../../../components/Table';
import {useRepoService} from '../../../../services/repository';
import {useRepoEntriesService} from '../../../../services/repository/instance/entries';

const View = {
    List: 0,
    Grid: 1,
};

const Browse = () => {
    const history = useHistory();
    const refModal = createRef();
    const {id, path} = useParams();
    const [newFolderPath, setNewFolderPath] = useState('');
    const [view, setView] = useState(View.List)
    const {
        loading,
        instance,
        getRepositoryInstance
    } = useRepoService();
    const entries = useRepoEntriesService();

    useEffect(() => {
        getRepositoryInstance(id);
        entries.listEntries(id, decodeURIComponent(path));
    }, [path]);

    useEffect(() => toast.error(entries.error), [entries.error]);

    return <Wrapper size={10}>
        <Card>
            <CardContent>
                <Row>
                    <Icon
                        size={1.5}
                        style={{marginRight: '5px'}}
                        path={icons[instance?.repository?.icon]}/>
                    <Typography variant="h4">{ instance?.repository?.name } | { instance?.name }</Typography>
                </Row>
                <br/>
                <Typography variant="h5">{decodeURIComponent(path)}</Typography>
                <br/>
                <Divider/>
                <br/>
                <Divide>
                    <ButtonGroup>
                        <Button
                            startIcon={<Icon path={icons.mdiViewList} size={1}/>}
                            onClick={() => setView(View.List)}
                            variant={view === View.List ? 'outlined' : 'contained'}>List</Button>
                        <Button
                            startIcon={<Icon path={icons.mdiGrid} size={1}/>}
                            onClick={() => setView(View.Grid)}
                            variant={view === View.Grid ? 'outlined' : 'contained'}>Grid</Button>
                    </ButtonGroup>
                    <ButtonGroup variant="contained">
                        <Button
                            startIcon={<Icon path={icons.mdiFolderPlusOutline} size={1}/>}
                            onClick={() => refModal?.current?.showModal?.()}>Create Folder</Button>
                        <Button
                            disabled={true}
                            startIcon={<Icon path={icons.mdiFileUploadOutline} size={1}/>}>Upload File</Button>

                    </ButtonGroup>
                </Divide>
                {
                    (view === View.List) && <Table
                        loading={loading}
                        headings={[
                            {
                                label: '',
                                render: ({isFile}) => <Icon
                                    size={1}
                                    path={isFile ? icons.mdiFile : icons.mdiFolder}
                                    style={{cursor: 'pointer'}}/>
                            },
                            {
                                label: 'Name',
                                field: 'name',
                                style: {width: 'auto', cursor: 'pointer'}
                            },
                            // {
                            //     label: 'Path',
                            //     field: 'path'
                            // },
                            {
                                label: 'Type',
                                field: 'type',
                                blankWhen: row => row.isDirectory,
                            },
                            {
                                label: 'Size',
                                field: 'size',
                                blankWhen: row => row.isDirectory,
                                transform: value => prettyBytes(Number(value)),
                            },
                            {
                                label: '',
                                render: row => <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => history.push(`/app/repositories/instance/browse/${id}/${encodeURIComponent(row.path)}`)}
                                    style={{cursor: 'pointer'}}>Open</Button>
                            },
                            {
                                label: '',
                                render: row => row.canDelete && <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{cursor: 'pointer'}}>Delete</Button>
                            }
                        ]}
                        data={entries.list}/>
                }
            </CardContent>
        </Card>
        <Modal ref={refModal}>
            <Typography variant="h5">Create Folder</Typography>
            <Divider/>
            <br/>
            <TextField
                style={{width: '100%'}}
                variant="outlined"
                label="Folder Name"
                onChange={({target: {value}}) => setNewFolderPath(value)}/>
            <br/>
            <Right>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => refModal?.current?.close?.()}>Cancel</Button>&nbsp;
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        refModal?.current?.close?.();
                        entries.createEntry(id, newFolderPath, false);
                    }}>Save</Button>
            </Right>
        </Modal>
    </Wrapper>
};

const Right = styled.div`
    display: flex;
    margin-top: 40px;
    align-items: flex-end;
    justify-content: flex-end;
`;

const Divide = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const Modal = styled.dialog`
    width: 400px;
    height: 200px;
    border-radius: 5px;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled.div`
    width: calc(100% - (2 * ${props => props.size}px);
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

export default Browse;