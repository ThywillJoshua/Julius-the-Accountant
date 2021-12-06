import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOQwEkdnD_2-TTUsod4HyLEfXTWR4M8iQ",
  authDomain: "julius-the-accountant.firebaseapp.com",
  projectId: "julius-the-accountant",
  storageBucket: "julius-the-accountant.appspot.com",
  messagingSenderId: "605740113597",
  appId: "1:605740113597:web:061ac2d0d5cd7f579161d4",
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

//initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
