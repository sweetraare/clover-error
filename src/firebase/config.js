const admin = require('firebase-admin');
const { ERORR_MESSAGES } = require('../commons/errorMessages');

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

console.log(config);

admin.initializeApp(config);

const connectedRef = admin.database().ref(".info/connected");

connectedRef.on(
  "value",
  (snap) => !!snap.val()
    ? console.log('Conectado')
    : console.log(ERORR_MESSAGES.DB_DISCONNECT));

exports.databaseFirebase = admin.database();
