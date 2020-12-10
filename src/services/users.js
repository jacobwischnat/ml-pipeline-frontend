import {useState} from 'react';
import createService from '@adamdickinson/react-service';

const [UserService, useUserService] = createService(({serverUrl, token}) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState('');
    const [accounts, setAccounts] = useState([]);

    return {
        user,
        token,
        error,
        users,
        avatar,
        loading,
        accounts,
        account,
        addAccount: async (name, icon) => {
            try {
                setError(null);
                setLoading(true);

                const body = new FormData();
                body.append('icon', icon);
                body.append('name', name);

                const {ok, status, response} = await fetch(serverUrl + '/api/account/create', {
                    method: 'POST',
                    body
                }).then(response => response.json());

                setLoading(false);
                if (ok) setAccounts([...accounts, response.account]);
                else setError(`${status}: ${response.description}`);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        getMe: async () => {
            try {
                setError(null);
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/user/me')
                    .then(response => response.json());

                setLoading(false);
                if (ok) {
                    setUser(response.user);
                    setAvatar(response.avatar);
                    setAccount(response.account);
                    setAccounts(response.accounts);
                } else setError(`${status}: ${response.description}`);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        invite: async (email) => {
            try {
                setError(null);
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/user/invite/create', {
                    method: 'POST',
                    body: JSON.stringify({email}),
                    headers: new Headers({'content-type': 'application/json'}),
                }).then(response => response.json());

                setLoading(false);
                if (!ok) setError(`${status}: ${response?.description}`);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
        getUsers: async () => {
            try {
                setError(null);
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/user/all')
                    .then(response => response.json());

                setLoading(false);
                if (ok) setUsers(response.users);
                else setError(`${status}: ${response.description}`);
            } catch (ex) {
                setLoading(false);
                setError(ex.toString());
            }
        },
    };
});

export {UserService, useUserService};