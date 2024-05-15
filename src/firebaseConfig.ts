import './App.css'
import 'firebase/auth';
import { initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "area-research-app-50895.firebaseapp.com",
  projectId: "area-research-app-50895",
  storageBucket: "area-research-app-50895.appspot.com",
  messagingSenderId: "793549166362",
  appId: "1:793549166362:web:a79a35aadd467812a37ea33"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };

