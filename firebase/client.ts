import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAlFtDYGJZwGvRs8tQRwD9GiO93jJ4JkgA",
  authDomain: "ladrillos-mocoa.firebaseapp.com",
  projectId: "ladrillos-mocoa",
  storageBucket: "ladrillos-mocoa.appspot.com",
  messagingSenderId: "361426425834",
  appId: "1:361426425834:web:cdbf2873cab05cb1100493"
};

export const app = initializeApp(firebaseConfig);
