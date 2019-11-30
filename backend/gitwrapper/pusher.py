from decouple import config
from pusher import Pusher

pusher_client = Pusher(
    app_id=config('PUSHER_APP_ID'),
    key=config('PUSHER_APP_KEY'),
    secret=config('PUSHER_APP_SECRET'),
    cluster=config('PUSHER_APP_CLUSTER'),
    ssl=True
)


def send_pusher(channel, event, data):
    sendpush = config('PUSHER_SEND_PUSH')
    if sendpush:
        pusher_client.trigger(channel, event, data)

    print("Sending pusher to channel: {0}, event: {1}".format(
        channel,
        event
    ))
