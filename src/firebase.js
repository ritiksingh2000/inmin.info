import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNwSP3r7legyqSBI4UHlvfWgK8EDk25Vg",
  authDomain: "myprojectbook-30863.firebaseapp.com",
  projectId: "myprojectbook-30863",
  storageBucket: "myprojectbook-30863.appspot.com",
  messagingSenderId: "1016762983826",
  appId: "1:1016762983826:web:2f3ce0eff3c1038bdecd4b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
