import Icon from '@mdi/react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { useMediaQuery } from 'react-responsive'
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { icons } from '../../../../constants';
import { Typography, Button, TextField, Card, CardContent, Divider } from '@material-ui/core';

import {useRepoService} from '../../../../services/repository';

const {mdiArrowBottomLeft, mdiContentCopy} = icons;

const View = () => {
    const {id} = useParams();
    const history = useHistory();
    const {
        loading,
        instance,
        updateInstance,
        getRepositoryInstance,
        updateInstanceConfigurationValue
    } = useRepoService();
    const [name, setName] = useState(instance?.name);

    useEffect(() => {
        (() => getRepositoryInstance(id))();
    }, []);

    const isMobile = useMediaQuery({query: '(max-device-width: 1224px)'});

    const handleSave = async () => {
        await updateInstance(Number(id), name || instance?.name, instance.configuration);
        history.push('/app/repositories');
    };

    return <Wrapper size={10}>
        <Card>
            {
                instance && <CardContent>
                    <Flex>
                        <TextField
                            variant="outlined"
                            value={name}
                            defaultValue={instance?.name}
                            onChange={({target: {value}}) => setName(value)}
                            style={{minWidth: isMobile ? '65vw' : '65vw'}}/>
                        <div style={{marginLeft: '10px'}}>
                            <Icon
                                size={isMobile ? 1.5 : 1}
                                path={mdiContentCopy}
                                style={{cursor: 'pointer'}}
                                onClick={() => navigator.clipboard.writeText(name)} />
                            <Icon
                                size={isMobile ? 1.5 : 1}
                                path={mdiArrowBottomLeft}
                                style={{cursor: 'pointer'}}
                                onClick={() => navigator.clipboard.readText().then(t => setName(t))}/>
                        </div>
                    </Flex>
                    <br/>
                    <Typography variant="h6">{instance.repository.name}</Typography>
                    <br/>
                    <Divider/>
                    <br/>
                    {
                        instance.configuration.map(({id, value, template: {name, description, type}}, index) => {
                            switch (type) {
                                case 'text':
                                    return <div key={index}>
                                        <TextField
                                            label={name}
                                            helperText={description}
                                            value={value}
                                            type="text"
                                            style={{minWidth: isMobile ? '90vw' : '65vw'}}/>&nbsp;
                                            <Icon
                                                size={isMobile ? 1 : 0.5}
                                                path={mdiContentCopy}
                                                title="Copy to clipboard"
                                                style={{cursor: 'pointer', marginTop: '10px'}}
                                                onClick={() => navigator.clipboard.writeText(value)} />
                                            &nbsp;
                                            <Icon
                                                size={isMobile ? 1 : 0.5}
                                                path={mdiArrowBottomLeft}
                                                title="Paste from clipboard"
                                                style={{cursor: 'pointer', marginTop: '10px'}}
                                                onClick={() => navigator.clipboard.readText().then(text => {
                                                    console.log({text});
                                                    updateInstanceConfigurationValue(id, text);
                                                })} />
                                        <br/><br/>
                                    </div>;

                                case 'password':
                                    return <div key={index}>
                                        <TextField
                                            label={name}
                                            helperText={description}
                                            value={value}
                                            type="password"
                                            style={{minWidth: isMobile ? '90vw' : '65vw'}}/>
                                        <Icon
                                            size={isMobile ? 1 : 0.5}
                                            path={mdiContentCopy}
                                            style={{cursor: 'pointer', marginTop: '10px'}}
                                            onClick={() => navigator.clipboard.writeText(value)} />
                                        <br/><br/>
                                    </div>;

                                case 'number':
                                    return <div key={index}>
                                        <TextField
                                            label={name}
                                            helperText={description}
                                            value={value}
                                            type="number"
                                            style={{minWidth: isMobile ? '90vw' : '65vw'}}/>
                                        <Icon
                                            size={isMobile ? 1 : 0.5}
                                            path={mdiContentCopy}
                                            style={{cursor: 'pointer', marginTop: '10px'}}
                                            onClick={() => navigator.clipboard.writeText(value)} />
                                        <br/><br/>
                                    </div>;
                            }

                            return <div key={index}></div>;
                        })
                }
                <Right>
                    {
                        loading
                            ? <ClipLoader
                                size={30}
                                loading={true}
                                style={{paddingRight: '30px'}}/>
                            : <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave.bind(this)}>Save</Button>
                    }
                </Right>
                </CardContent>
            }
        </Card>
    </Wrapper>
};

const Flex = styled.div`
    display: flex;
`;

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Wrapper = styled.div`
    width: 100%;
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

export default View;