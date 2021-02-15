import React, {useState} from 'react';

import Icon from '@mdi/react';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import {ResizableBox} from 'react-resizable';

import {icons} from '../../constants';
const {
    mdiUpload,
    mdiMagnify,
    mdiCloseBox,
    mdiChevronDown,
    mdiFolderOutline,
    mdiSortAlphabeticalDescending,
    mdiFolderOpenOutline,
} = icons;

import * as constants from '../../constants';

const Button = ({icon, children}) => <ButtonWrapper>
    <Icon path={icon} size={0.8} color="#ccc"/>
    <PlainButton>{children}</PlainButton>
</ButtonWrapper>;

const FileExplorer = ({open, name, fileExplorer}) => {
    return <Wrapper>
        <TopPane>
            <LeftGroup>
                <Button icon={mdiFolderOutline}>New Folder</Button>
                <Button icon={mdiUpload}>Upload</Button>
                <Button icon={mdiSortAlphabeticalDescending}>Sort</Button>
            </LeftGroup>
            <RightGroup>
                <Button icon={mdiCloseBox}></Button>
            </RightGroup>
        </TopPane>
        <MainPane>
            <DirectoryList id="directoryList">
                <Directory
                    style={{
                        height: '100%',
                        marginTop: '8px',
                        marginLeft: '-40px',
                    }}>
                    <DirectoryName style={{height: '40px'}}>Root Folder</DirectoryName>
                    <li>
                        <Directory>
                            <DirectoryName>Some Other Directory</DirectoryName>
                            <li>
                                <Directory>
                                    <ChildDirectory>Folder 1</ChildDirectory>
                                    <ChildDirectory>Folder 2</ChildDirectory>
                                    <ChildDirectory>Folder 3</ChildDirectory>
                                </Directory>
                            </li>
                        </Directory>
                    </li>
                </Directory>
            </DirectoryList>
            <FileList>
                <ToolPane>
                    <LeftGroup>
                        Folder Name
                    </LeftGroup>
                    <RightGroup>
                        <TextField size="small" InputProps={{startAdornment: <Icon size={1} path={mdiMagnify}/>}}/>
                    </RightGroup>
                </ToolPane>
            </FileList>
        </MainPane>
    </Wrapper>
};

const ChildDirectory = ({children}) => <li style={{display: 'flex', alignItems: 'center'}}>
    <Icon path={mdiFolderOutline} size={0.8} color="#8f8f8f" style={{paddingRight: '5px'}}/>
    {children}
</li>

const DirectoryName = ({children}) => <li style={{display: 'flex', alignItems: 'center'}}>
    <Icon path={mdiChevronDown} size={0.8} color="#8f8f8f"/>
    <Icon path={mdiFolderOpenOutline} size={0.8} color="#8f8f8f" style={{paddingRight: '5px'}}/>
    {children}
</li>;

const Directory = styled.ul`
    width: 100%;
    margin: 0 0 0 0;
    font-size: 13px;
    font-family: arial;
    list-style: none;
    height: 100%;

    > li:first-child {
        height: 20px;
        position: relative;
        align-items: center;
        cursor: pointer;
    }

    > li {
        min-height: 20px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0
`;

const TopPane = styled.div`
    display: flex;
    min-height: 37px;
    padding-left: 5px;
    padding-right: 5px;
    align-items: center;
    background-color: #fafafa;
    justify-content: flex-start;
`;

const LeftGroup = styled.div`
    display: flex;
    width: 100%;
`;

const RightGroup = styled.div`
    display: flex;
    padding-right: 10px;
    justify-content: flex-end;
`;

const MainPane = styled.div`
    display: flex;
    height: 100%;
    border-top: 1px solid #e0e0e0;
`;

const PlainButton = styled.button`
    border: none;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
`;

const ButtonWrapper = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: flex-start;

    :hover {
        background-color: #e0e0e0;
    }
`;

const DirectoryListWrapper = styled.div`
    height: 100%;
    width: 300px;
    max-height: 100%;
    // overflow-y: scroll;
    border-right: 1px solid #e0e0e0;
`;

const DirectoryList = ({children}) => {
    const [active, setActive] = useState(null);

    const handleMouseMove = ({target, clientX}) => {
        const rect = target.parentElement.getBoundingClientRect();
        const x = clientX - rect.left;
        const dragLine = rect.width - constants.DRAG_THRESHOLD;
        if (x > dragLine) {
            target.parentElement.style.cursor = 'ew-resize';
        } else {
            target.parentElement.style.cursor = 'pointer';
        }

        if (active) {
            const diff = clientX - active.x;
            let change = diff * 10;
            change = (diff < 0 ? -1 * diff : diff);
            let newWidth = active.width + change;
            console.log('width before', active.width);
            console.log('width after', newWidth);
            // target.parentElement.style.width = `${newWidth}px`;
            console.log(target.parentElement);

        }
    };

    const handleMouseDown = ({target, clientX}) => {
        const rect = target.parentElement.getBoundingClientRect();
        const x = clientX - rect.left;
        const dragLine = rect.width - constants.DRAG_THRESHOLD;
        if ((x > dragLine) && !active) {
            console.log('active', rect.width, target.parentElement.offsetWidth);
            setActive({x, width: target.parentElement.clientWidth});
        }
    };

    return <DirectoryListWrapper
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={() => setActive(null)}
        onMouseOut={() => setActive(null)}>
        {children}
    </DirectoryListWrapper>
}

const FileList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ToolPane = styled.div`
    width: 100%;
    display: flex;
    font-family: arial;
    font-size: 13px;
    padding-top: 3px;
    padding-left: 5px;
    padding-bottom: 4px;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
`;

export default FileExplorer;