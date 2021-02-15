import Icon from '@mdi/react';
import styled from 'styled-components';
import {icons} from '../../../../constants';
import {useHistory} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import React, { useEffect } from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

import {useRepoService} from '../../../../services/repository';

const RepositoryIcon = ({id, icon, name, iconSize}) => {
    const history = useHistory();

    return <Card
        variant="outlined"
        style={{
            maxWidth: '150px',
            maxHeight: '150px',
            marginBottom: '20px',
            cursor: 'pointer'
        }}
        onClick={() => history.push(`/app/repositories/instance/create/${id}`)}
        onMouseOver={({target}) => {
            if (target.querySelector('svg > path')) {
                target.querySelector('svg > path').style.fill = 'black';
            }
        }}
        onMouseLeave={({target}) => {
            if (target.querySelector('svg > path')) {
                target.querySelector('svg > path').style.fill = '#ccc';
            }
        }}
        >
        <CardContent style={{textAlign: 'center'}}>
            <Typography>{name}</Typography>
            <Icon path={icon} size={iconSize || 4} color="#ccc"/>
        </CardContent>
    </Card>;
}

class MockFileExplorer {
    listDirectory(path) {

    }

    createDirectory(path) {

    }
}

const Repositories = () => {
    const {repositories, loading, error, getRepositories} = useRepoService();

    const isMobile = useMediaQuery({query: '(max-device-width: 1224px)'});

    useEffect(() => {
        (() => getRepositories())();
    }, []);

    return <Wrapper size={10}>
        <Card>
            <Wrapper size={20}>
                <Typography variant="h4">Repositories</Typography>
                <br/>
                <Grid mobile={isMobile}>
                    {
                        repositories.map(({id, name, icon}, index) =>
                            <RepositoryIcon
                                key={index}
                                id={id}
                                name={name}
                                icon={icons[icon]}/>)
                    }
                </Grid>
            </Wrapper>
        </Card>
        {/* <FileExplorer
            open={true}
            name="test"
            fileExplorer={new MockFileExplorer()}/> */}
    </Wrapper>
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.mobile ? '2' : '4'}, 1fr);
    height: 100%;
`;

const Wrapper = styled.div`
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

export default Repositories;