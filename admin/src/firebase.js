import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBbqqge9yHSEStePfHMkjZu6Bsl1FnuVAA",
    authDomain: "freeflix-1.firebaseapp.com",
    projectId: "freeflix-1",
    storageBucket: "freeflix-1.appspot.com",
    messagingSenderId: "33648128075",
    appId: "1:33648128075:web:4ba4b15e02fde07ae1ddce",
    measurementId: "G-VK6BNMFVW8"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;