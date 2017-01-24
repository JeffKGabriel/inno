import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCnbGDFd5WeG9VN7XybGtnBtCubzm0ly6g",
  authDomain: "reactkappa.firebaseapp.com",
  databaseURL: "https://reactkappa.firebaseio.com",
  storageBucket: "reactkappa.appspot.com",
  messagingSenderId: "817818813163"
})

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export{
  ref,
  firebaseAuth,
  facebookProvider,
}
