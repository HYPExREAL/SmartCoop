"use client";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDmJTg3AQNUP9FKGfw5etQtp8ZiBiPEwnA",
    authDomain: "smartcoop-6f3b1.firebaseapp.com",
    databaseURL: "https://smartcoop-6f3b1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartcoop-6f3b1",
    storageBucket: "smartcoop-6f3b1.appspot.com",
    messagingSenderId: "297121973941",
    appId: "1:297121973941:web:aec24753a370daaf00a0fc"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue };