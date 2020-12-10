import React, { createRef, useState } from 'react';
import styled from 'styled-components';
import {
    Card,
    Button,
    Avatar,
    TextField,
    InputLabel,
    Typography,
} from '@material-ui/core';
import { useUserService } from '../../../services/users';

const Wrapper = styled.div`
    padding: ${props => `${props.size}px ${props.size}px ${props.size}px ${props.size}px`};
`;

const Flex = styled.div`
    width: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const Create = () => {
    const fileRef = createRef();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const {addAccount} = useUserService();

    const handleName = ({target: {value}}) => setName(value);
    const handleFile = ({target: {files: [file]}}) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);

            setImage(file);
        }
    };

    return <Wrapper size={10}>
        <Card>
            <Wrapper size={20}>
                <Typography variant="h4">Create Account</Typography>
                <br/>
                <Flex>
                    <input
                        type="file"
                        ref={fileRef}
                        accept="image/"
                        onChange={handleFile}
                        style={{display: 'none'}}/>
                    <InputLabel>Avatar</InputLabel><br/>
                    <Avatar
                        src={preview}
                        onClick={() => fileRef.current.click()}
                        style={{
                            cursor: 'pointer',
                            height: '100px',
                            width: '100px'
                        }}/><br/>
                </Flex>
                <TextField
                    type="text"
                    value={name}
                    label="Account Name"
                    variant="outlined"
                    style={{width: '200px'}}
                    onChange={handleName}/><br/><br/>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => addAccount(name, image)}
                    style={{width: '200px'}}>Save</Button>
            </Wrapper>
        </Card>
    </Wrapper>;
};

export default Create;