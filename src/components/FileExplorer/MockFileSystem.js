const parsePath = path => {
    let newPath = path;

    if (newPath.startsWith('/')) newPath = newPath.slice(1);
    if (newPath.endsWith('/')) newPath = newPath.slice(newPath.length - 1);

    return newPath;
}

const parseName = path => {
    return parsePath(path).split('/').pop();
}

const makeDirectory = path => {
    const directories = parsePath(path).split('/');

    for (let i = 1; i < directories.length; i += 1) {
        const directoryName = directories[i - 1];

        let existingDirectory = this.folders.folders.find(({name}) => name === directoryName);
        if (!existingDirectory) {

        }
    }
}

export default class MockFileSystem {
    constructor() {
        this.folders = {name: 'root', folders: [], files: []};
    }

    createDirectory(path) {
        return {
            name: parseName(path),
            folders: [],
            files: []
        };
    }

    listDirectory(path) {

    }
}