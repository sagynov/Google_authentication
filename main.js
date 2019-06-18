// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "<apikey>",
    authDomain: "<authDomain>",
    databaseURL: "<database_url>",
    projectId: "<project_id>,
    storageBucket: "<storage_bucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authentication
const auth = firebase.auth();


// Realtime Database
const preObject = document.getElementById('object');
const ulList = document.getElementById('list');

const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('hobbies');

dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3);
    console.log(snap.val());
});
// When child added
dbRefList.on('child_added', child => {
    const li = document.createElement('li');
    li.innerText = child.val();
    li.id = child.key;
    ulList.appendChild(li);
    console.log(Object(child));
});
// If changed
dbRefList.on('child_changed', change => {
    const liChanged = document.getElementById(change.key);
    liChanged.innerText = change.val();
});
dbRefList.on('child_removed', remove => {
    const liRemoved = document.getElementById(remove.key);
    liRemoved.remove();
});
// Cloud Message
const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BACV5ieG3gSk76XPc4F3WtiYJCa6ix0LdcOx75riToeFxSkMzS8VFIALfcPauHuuqTtkqYYDLcf0OyZdie1Kvyw");
messaging.requestPermission()
.then(function(){
    console.log('Have permission');
    return messaging.getToken();
})
.then(function(token){
    console.log(token);
})
.catch(function(err) {
    console.log('Error' +err);
});
messaging.onMessage(function(payload){
    console.log(payload);
    var sms = document.getElementById('sms');
    sms.innerHTML += '<p class="bg-primary"><img src="'+payload.notification.icon+'">'+payload.notification.body+'</p>';
});
