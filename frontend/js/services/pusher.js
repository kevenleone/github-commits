import Pusher from 'pusher-js';

const pusher_key = window.pusher_key || '';

const pusher = new Pusher(pusher_key, {
  cluster: 'mt1',
  forceTLS: true,
});

export default pusher;
