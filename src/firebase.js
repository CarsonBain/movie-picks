import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyAY21lIu2b5ku4hmQ3UZl6qWedkJZq48d4',
  authDomain: 'chungus-picks.firebaseapp.com',
  databaseURL: 'https://chungus-picks-default-rtdb.firebaseio.com',
  projectId: 'chungus-picks',
  storageBucket: 'chungus-picks.appspot.com',
  messagingSenderId: '57856530922',
  appId: '1:57856530922:web:c65ed558a966eea29f3a93',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const moviesCollection = db.collection('movies');
const watchListsCollection = db.collection('watchlists');
const seenListsCollection = db.collection('seenlists');

// export utils/refs
export { db, auth, usersCollection, moviesCollection, watchListsCollection, seenListsCollection };
