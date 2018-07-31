import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD6R4IbPsLKFu4HOOCDpx-Rgr22Yi8_H9U",
  authDomain: "mango-bot.firebaseapp.com",
  databaseURL: "https://mango-bot.firebaseio.com",
  projectId: "mango-bot",
  storageBucket: "mango-bot.appspot.com",
  messagingSenderId: "800415784416"
};

firebase.initializeApp(config);

const auth = firebase.auth()
const db = firebase.database();
export { auth , db }
