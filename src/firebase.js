import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDSH4Ss6OwTiXRejCWSdE9NY6SJoIAcSwM",
    authDomain: "khaibao-yte.firebaseapp.com",
    databaseURL: "https://khaibao-yte-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "khaibao-yte",
    storageBucket: "khaibao-yte.appspot.com",
    messagingSenderId: "342941044095",
    appId: "1:342941044095:web:163aa49f76ff4c10519e4a"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;