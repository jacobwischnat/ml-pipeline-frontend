import {useState} from 'react';
import createService from '@adamdickinson/react-service';

const [UserService, useUserService] = createService(({serverUrl, token}) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    return {
        token,
        error,
        users,
        loading,
        getUsers: async () => {
            try {
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/users', {
                    headers: new Headers({'authorization': `Authorization ${token}`}),
                }).then(response => response.json());

                if (ok) setUsers(response.users);
                else setError(`${status}: ${response.description}`);
            } catch (ex) {
                setError(ex.toString());
            } finally {
                setLoading(false);
            }
        },
    };
});

export {UserService, useUserService};