import axios from 'axios';

import Config from '../config';

const instance = axios.create({
  baseURL: Config.baseURL,
});

const authClient = {
  client: instance,
};

export default authClient;
