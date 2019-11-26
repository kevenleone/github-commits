import socket from 'socket.io-client';

import { baseURL } from '.';

const ws = socket.connect(baseURL);
export default ws;
