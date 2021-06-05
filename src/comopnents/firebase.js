import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'give api key', //like AIzaSy4r_Zih1_G76q4GyT23g-9OrZThDrcCw
  authDomain: 'give auth domain', // like fir-react.firebaseapp.com
  projectId: 'give project id', // like fir-react
  storageBucket: 'give storage bucket', //like fir-react.appspot.com
  messagingSenderId: 'give messaging sender id', //like 5897433334344
  appId: 'give app id', //like 1:5897433334344:web:e043re931ed43438c5
  databaseURL: 'give database url', //like https://fir-react-default-rtdb.firebaseio.com/
};
firebase.initializeApp(firebaseConfig);

export default firebase;
