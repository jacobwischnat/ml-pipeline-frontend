import {useState} from 'react';
import createService from '@adamdickinson/react-service';

const [RepoEntriesService, useRepoEntriesService] = createService(({serverUrl}) => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    return {
        error,
        list,
        loading,
        createEntry: async (id, path, isFile, type, data) => {
            try {
                setError(null);
                const form = new FormData();
                form.append('path', path);
                const {response} = await fetch(`${serverUrl}/api/repository/instance/entries/create/${id}`, {
                        body: form,
                        method: 'POST',
                    }).then(response => response.json());

                if (!response.ok) {
                    setError(response.description);
                }

                setLoading(false);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        listEntries: async (id, path = '/') => {
            try {
                setError(null);
                setLoading(true);
                const {response: {items}} = await fetch(`${serverUrl}/api/repository/instance/entries/list/${id}`, {
                        headers: new Headers({'content-type': 'application/json'}),
                        body: JSON.stringify({path}),
                        method: 'POST',
                    }).then(response => response.json());
                setLoading(false);
                setList(items);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
    }
});

export {RepoEntriesService, useRepoEntriesService};