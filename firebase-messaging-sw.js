importScripts('bower_components/firebase/firebase-app.js');
importScripts('bower_components/firebase/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '{$ firebase.messagingSenderId $}'
});

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(({ data }) => {
  var notification = Object.assign({}, data, {
    data: {
      click_action: data.click_action
    }
  });
  return self.registration.showNotification(notification.title, notification);
});

self.addEventListener('notificationclick', event => {
  var url = event.notification.data.click_action && event.notification.data.click_action.startsWith('/')
    ? self.origin + event.notification.data.click_action
    : event.notification.data.click_action;
  event.waitUntil(clients.openWindow(url));
});
