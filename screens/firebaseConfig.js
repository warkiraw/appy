// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBT7AMOkuhXtCBsxe_RR4GXZIWzP3yWT-s",
  authDomain: "gatob-51131.firebaseapp.com",
  projectId: "gatob-51131",
  storageBucket: "gatob-51131.appspot.com",
  messagingSenderId: "732296045896",
  appId: "1:732296045896:web:309017671ab41e09b77f7d",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
export { firebase };