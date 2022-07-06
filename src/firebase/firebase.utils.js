import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK06yCzwWsqkBO1x2_oENdA4PlkrFWNTo",
  authDomain: "ecommerce-project-a6b1e.firebaseapp.com",
  //   databaseURL: "https://ecommerce-project-a6b1e-default-rtdb.firebaseio.com/",
  databaseURL: "https://ecommerce-project-a6b1e.firebaseio.com",
  projectId: "ecommerce-project-a6b1e",
  storageBucket: "ecommerce-project-a6b1e.appspot.com",
  messagingSenderId: "504782939104",
  appId: "1:504782939104:web:5f5bd22e0bfe715b4d0185",
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error while creating user: ", error.message);
    }

    return userRef;
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
