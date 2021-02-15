import {Button, Card, CardContent, Divider, TextField, Typography} from '@material-ui/core';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {useRepoService} from '../../../../services/repository';

const Create = () => {
    const {repositoryId} = useParams();
    const {
        error,
        loading,
        template,
        repositories,
        configuration,
        getRepositories,
    } = useRepoService();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [config, setConfig] = useState([]);

    useEffect(() => {
        (() => getRepositories())();
        (() => template.getFields(repositoryId))();
    }, []);

    const handleRepoName = ({target: {value}}) => setName(value);
    const handleDescription = ({target: {value}}) => setDescription(value);

    const handleCreate = () => configuration.postConfiguration(repositoryId, name, description, config);

    const updateConfig = (name, id, {target: {value}}) => {
        if (config.some(({name: n}) => name === n)) {
            const index = config.findIndex(({name: n}) => name === n);

            config.splice(index, 1, {id, name, value});
        } else {
            config.push({id, name, value});
        }

        setConfig([...config]);
    };

    return <Wrapper size={10}>
        <Card>
            <CardContent>
                <Typography variant="h4">{(repositories.find(({id}) => id == repositoryId) || {}).name || 'Create Repository'}</Typography>
                <TextField
                    label="Repository Name"
                    helperText="The name for this repository"
                    onChange={handleRepoName.bind(this)}
                    type="text"/>
                <br/>
                <TextField
                    label="Repository Description"
                    helperText="The description of this repository"
                    onChange={handleDescription.bind(this)}
                    type="text"/>
                <br/>
                <br/>
                <Divider />
                <br/>
                <Typography variant="h6">Configuration</Typography>
                {
                    template.fields.map(({id, name, description, type}, index) => {
                        switch (type) {
                            case 'text':
                                return <div key={index}>
                                    <TextField
                                        label={name}
                                        helperText={description}
                                        onChange={updateConfig.bind(this, name, id)}
                                        type="text"/>
                                    <br/><br/>
                                </div>;

                            case 'password':
                                return <div key={index}>
                                    <TextField
                                        label={name}
                                        helperText={description}
                                        onChange={updateConfig.bind(this, name, id)}
                                        type="password"/>
                                    <br/><br/>
                                </div>;

                            case 'number':
                                return <div key={index}>
                                    <TextField
                                        label={name}
                                        helperText={description}
                                        onChange={updateConfig.bind(this, name, id)}
                                        type="number"/>
                                    <br/><br/>
                                </div>;
                        }

                        return <div key={index}></div>;
                    })
                }
                <Right>
                    <Button
                        onClick={() => handleCreate()}
                        variant="contained"
                        color="primary">Create</Button>
                </Right>
            </CardContent>
        </Card>
    </Wrapper>;
};

const Right = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

const Wrapper = styled.div`
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

export default Create;