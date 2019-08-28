import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAiMC9K7NOKYY96rB8X0szmT9ukkVxsy2M",
  authDomain: "parti-test1.firebaseapp.com",
  databaseURL: "https://parti-test1.firebaseio.com",
  projectId: "parti-test1",
  storageBucket: "parti-test1.appspot.com",
  messagingSenderId: "112588953542",
  appId: "1:112588953542:web:3adeb7d6b9b7569a"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const firestore = firebase.firestore();
export const functions = firebase.app().functions("asia-northeast2");
if (process.env.NODE_ENV === "development") {
  functions.useFunctionsEmulator("http://localhost:5000");
}
// export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const storage = firebase.storage();
export const auth = firebase.auth();
export const uiConfig = {
  // callbacks: {
  //   signInSuccessWithAuthResult: function(authResult, redirectUrl) {
  //     // User successfully signed in.
  //     // Return type determines whether we continue the redirect automatically
  //     // or whether we leave that to developer to handle.
  //     return true;
  //   },
  //   uiShown: function() {
  //     // The widget is rendered.
  //     // Hide the loader.
  //     document.getElementById("loader").style.display = "none";
  //   }
  // },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  // signInSuccessUrl: "localhost",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  // tosUrl: "<your-tos-url>",
  // Privacy policy url.
  // privacyPolicyUrl: "<your-privacy-policy-url>"
};
