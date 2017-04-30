export function CustomListeners () {
  return (worker) => new CustomListenersImpl(worker)
};

export class CustomListenersImpl {

  setup () {}

  constructor () {
    self.addEventListener('notificationclick', function (event) {
        console.log('On notification click: ');
        event.notification.close();

        // https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
        // This looks to see if the current is already open and
        // focuses if it is
        event.waitUntil(clients.matchAll({
            type: "window"
        }).then(function(clientList) {
            console.dir(clientList);
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if ('focus' in client) { // client.url === '/' && 
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow('/rss-reader-ng-client/');
            }
        }));
    });

    self.addEventListener('notificationclose', function (event) {
        console.log('On notification close');
    });
  }

}
