importScripts('https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.0/firebase-messaging.js');

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCE4BwJQCuhlAXJsi9YxX5GQNR0w5mbdnk",
    authDomain: "my-project-a122a.firebaseapp.com",
    databaseURL: "https://my-project-a122a.firebaseio.com",
    projectId: "my-project-a122a",
    storageBucket: "my-project-a122a.appspot.com",
    messagingSenderId: "814842109000",
    appId: "1:814842109000:web:7a99b611d3b54c2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
    console.log('[firebase-messaging-sw.js] Received background Message', payload);
    return self.registration.showNotification(title, options);
});
