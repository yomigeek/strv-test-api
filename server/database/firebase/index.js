import * as firebase from "firebase";
import "firebase/database";

require("dotenv").config({path: "../.env"});

let config = {
  apiKey: process.env.FBASE_API_KEY,
  authDomain: process.env.FBASE_AUTH_DOMAIN,
  databaseURL: process.env.FBASE_DB_URL,
  projectId: process.env.FBASE_PROJECT_ID,
  storageBucket: process.env.FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FBASE_MESSAGING_SENDER_ID,
  appId: process.env.FBASE_APP_ID,
  measurementId: process.env.FBASE_MID,
};

firebase.initializeApp(config);

export default firebase.database();
