import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBMSpTcEv0g1xv4WN4jL53d8EoCL4aaRLY",
  authDomain: "centralauth-f85d4.firebaseapp.com",
  projectId: "centralauth-f85d4",
  storageBucket: "centralauth-f85d4.appspot.com",
  messagingSenderId: "454440149526",
  appId: "1:454440149526:web:a39d6c6fba2db8561c0b37"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;