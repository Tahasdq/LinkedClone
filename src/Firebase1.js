
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_kWbZZF8RT6ggObi_uPdGi8HKUpusYNQ",
    authDomain: "linkedin-9228d.firebaseapp.com",
    projectId: "linkedin-9228d",
    storageBucket: "linkedin-9228d.appspot.com",
    messagingSenderId: "226493598036",
    appId: "1:226493598036:web:d354e731d376d1f4d020c1",
    measurementId: "G-44XBQD965H"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  // const db= getFirestore(firebaseApp)

  // const auth = getAuth(db);
  const auth = firebase.auth()

export  {db,auth};