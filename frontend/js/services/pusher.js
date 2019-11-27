import Pusher from 'pusher-js';

const pusher = new Pusher(window.pusher_key, {
  cluster: 'mt1',
  forceTLS: true,
});

export default pusher;
