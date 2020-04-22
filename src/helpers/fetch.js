import { BASE_URL } from 'configs';

export default class Fetch {
    static async request(options) {
        const ACCESS_TOKEN = window.localStorage.getItem('token');
        const { method, path, headers, body, data, withAuthToken, isChecked } = options;
        let requestConfig = {
            method,
            headers: {
                'Accept': 'application/json',
                ...headers
            },
        };

        if(!withAuthToken) {
          requestConfig.headers['x-auth-token'] = ACCESS_TOKEN;
        }

        if (body) {
            requestConfig.body = JSON.stringify(body);
            requestConfig.headers['Content-Type'] = 'application/json';
        } else if(data) {
            requestConfig.body = data;
        }

        const response = await fetch(new Request(`${BASE_URL}${path}`, requestConfig))
        .then(res => res.json())
        .then(res => res);

        if (response.status >= 200 && response.status <= 299) {
          return response;
        } else {
          if(isChecked) {
            window.localStorage.clear();
            window.location.reload();
          }
          return response;
        };
    }

    /* GET (retrieve) */
    static get = options => Fetch.request({ ...options, method: 'GET' });

    /* POST (create) */
    static post = options => Fetch.request({ ...options, method: 'POST' });

    /* POST (create) */
    static patch = options => Fetch.request({ ...options, method: 'PATCH' });

    /* DELETE (remove) */
    static delete = options => Fetch.request({ ...options, method: 'DELETE' });
}
