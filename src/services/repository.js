import {useState} from 'react';
import createService from '@adamdickinson/react-service';

const [RepoService, useRepoService] = createService(({serverUrl}) => {
    const [repositories, setRepositories] = useState([]);
    const [instances, setInstances] = useState([]);
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const repos = {
        getRepositoryInstance: async (id) => {
            try {
                setLoading(true);
                const {response: {instance}} = await fetch(`${serverUrl}/api/repository/instance/${id}`)
                    .then(response => response.json());
                setLoading(false);
                setInstance(instance);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        getRepositories: async () => {
            try {
                setLoading(true);
                const {response: {repositories}} = await fetch(`${serverUrl}/api/repository`)
                    .then(response => response.json());
                setLoading(false);
                setRepositories(repositories);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        getInstances: async () => {
            try {
                setLoading(true);
                const {response: {instances}} = await fetch(`${serverUrl}/api/repository/instance`)
                    .then(response => response.json());
                setLoading(false);
                setInstances(instances);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        updateInstanceConfigurationValue: (id, value) => {
            const confs = [...instance.configuration];
            const config = confs.find(({id: _id}) => _id === id);
            const configIndex = confs.findIndex(({id: _id}) => _id === id);
            confs.splice(configIndex, 1, {...config, value});

            setInstance({...instance, configuration: [...confs]});
        },
        updateInstance: async (id, name, configuration) => {
            try {
                setLoading(true);
                const {response: {instances}} = await fetch(
                    `${serverUrl}/api/repository/instance`,
                    {
                        method: 'PUT',
                        headers: new Headers({'content-type': 'application/json'}),
                        body: JSON.stringify({id, name, configuration})
                    }
                ).then(response => response.json());
                setLoading(false);
                setInstances(instances);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        error,
        loading,
        instance,
        instances,
        repositories,
    };

    const [fields, setFields] = useState([]);
    repos.template = {
        fields,
        getFields: async (templateId) => {
            try {
                setLoading(true);
                const {response: {fields}} = await fetch(
                    `${serverUrl}/api/repository/template/${templateId}`
                ).then(response => response.json());
                setLoading(false);
                setFields(fields);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        }
    };

    const [configuration, setConfiguration] = useState([]);
    const [configurationId, setConfigurationId] = useState(null);
    repos.configuration = {
        configuration,
        configurationId,
        postConfiguration: async (repositoryId, name, description, configuration) => {
            try {
                setLoading(true);
                const {response: {configurationId}} = await fetch(
                    `${serverUrl}/api/repository/configuration`,
                    {
                        method: 'POST',
                        headers: new Headers({'content-type': 'application/json'}),
                        body: JSON.stringify({
                            name,
                            description,
                            configuration,
                            repositoryId: Number(repositoryId),
                        })
                    }
                ).then(response => response.json());
                setLoading(false);
                setConfigurationId(configurationId);
            } catch (ex) {
                console.error(ex);
                setLoading(false);
                setError(ex.toString());
            }
        }
    };

    return repos;
});

export {RepoService, useRepoService};