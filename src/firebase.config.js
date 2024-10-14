// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA43Id5_IXSPMTNluSQpfo6GvEfFKWpTHg",
  authDomain: "queue-management-system-414ed.firebaseapp.com",
  projectId: "queue-management-system-414ed",
  storageBucket: "queue-management-system-414ed.appspot.com",
  messagingSenderId: "333418760702",
  appId: "1:333418760702:web:99345bb503d2d4723898af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };