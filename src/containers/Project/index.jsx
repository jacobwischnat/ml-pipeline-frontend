import React from 'react'
import styled from 'styled-components';
import {Typography} from '@material-ui/core';

const Project = () => {

    return <Wrapper size={10}>
        <Typography variant="h4">Projects</Typography>
    </Wrapper>;
};

const Wrapper = styled.div`
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

export default Project;