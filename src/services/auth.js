import {useState} from 'react';
import createService from '@adamdickinson/react-service';

const [AuthService, useAuthService] = createService(({serverUrl}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    return {
        token,
        error,
        loading,
        swap: async (accountId) => {
            try {
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/auth/swap/' + accountId)
                    .then(response => response.json());

                if (!ok) setError(`${status}: ${response.description}`);
            } catch (ex) {
                setError(ex.toString());
            } finally {
                setLoading(false);
            }
        },
        accept: async (name, email, password, uuid) => {
            try {
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/user/invite/accept', {
                    method: 'POST',
                    headers: new Headers({'content-type': 'application/json'}),
                    body: JSON.stringify({name, email, password, uuid}),
                }).then(response => response.json());

                if (ok) {
                    setToken(response.token);
                    localStorage.setItem('token', response.token);
                } else setError(`${status}: ${response.description}`);
            } catch (ex) {
                setError(ex.toString());
            } finally {
                setLoading(false);
            }
        },
        authenticate: async (email, password) => {
            try {
                setLoading(true);

                const {ok, status, response} = await fetch(serverUrl + '/api/auth/login', {
                    method: 'POST',
                    headers: new Headers({'content-type': 'application/json'}),
                    body: JSON.stringify({email, password}),
                }).then(response => response.json());

                if (ok) {
                    setToken(response.token);
                    localStorage.setItem('token', response.token);
                } else setError(`${status}: ${response.description}`);
            } catch (ex) {
                setError(ex.toString());
            } finally {
                setLoading(false);
            }
        },
    };
});

export {AuthService, useAuthService};