// Import the functions you need from the SDKs
import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, Auth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZI9UrCU92t81tldEZPwMs2SXUkZhN2YA",
  authDomain: "vertex-v1-f242b.firebaseapp.com",
  projectId: "vertex-v1-f242b",
  storageBucket: "vertex-v1-f242b.appspot.com",
  messagingSenderId: "534109269483",
  appId: "1:534109269483:web:edb53cd1f445eb3729fdae",
  measurementId: "G-5BKQ6Y7SNL",
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

if (!getApps().length) {
  try {
    // Initialize Firebase App
    app = initializeApp(firebaseConfig);

    // Initialize Firestore
    db = getFirestore(app);

    // Initialize Firebase Auth with persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

    // Initialize Firebase Storage
    storage = getStorage(app);

    // Initialize analytics only if supported
    isSupported().then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    });
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { db, auth, storage };
