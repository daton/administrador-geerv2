
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');




/**** aqui esta lo necesario para frebase  PERO MARAR ERROR LA MAMAMAD*/
firebase.initializeApp({
  apiKey: "AIzaSyB7KHPO2QFg0m2w54ovEfipPFOvbRZ3o_c",
    authDomain: "geer-59368.firebaseapp.com",
    databaseURL: "https://geer-59368.firebaseio.com",
    projectId: "geer-59368",
    storageBucket: "geer-59368.appspot.com",
    messagingSenderId: "172672332",
    appId: "1:172672332:web:356c35a149e8133a8abbe9",
    measurementId: "G-GJJCRFDDFJ"
  
});

const messaging = firebase.messaging();


//Aqui termina lo de firebase mamadas *******************************************************


//Todos  pero no se porque marc eror la mamada
console.log('Mensaje from service-worker.js presenta errores de conectividad a terceros en segundo plano! ');


