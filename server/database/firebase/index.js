import * as firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyDlDez7e7MjgWLoB217zZZcmRcmfA5bFPc",
    authDomain: "strv-addressbook-olaoye-yomi.firebaseapp.com",
    databaseURL: "https://strv-addressbook-olaoye-yomi-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "strv-addressbook-olaoye-yomi",
    storageBucket: "strv-addressbook-olaoye-yomi.appspot.com",
    messagingSenderId: "423464213551",
    appId: "1:423464213551:web:b5f92db022d2dddca1fada",
    measurementId: "G-4Y5864LJGE"
};

firebase.initializeApp(config);

export default firebase.database();