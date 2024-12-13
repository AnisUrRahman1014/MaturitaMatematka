import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

let app;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    return app;
  } catch (err) {
    console.error('Firebase initialization failed', err);
  }
};

const getFirebaseApp = () => app;
