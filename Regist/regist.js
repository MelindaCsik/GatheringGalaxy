
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword} from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCFjj2TpErZVY8UAW8vYudUSivqVxy0wKo",
    authDomain: "gatheringalaxy.firebaseapp.com",
    projectId: "gatheringalaxy",
    storageBucket: "gatheringalaxy.appspot.com",
    messagingSenderId: "639862837184",
    appId: "1:639862837184:web:b56be4ef49e3dbbcef4225"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = firebase.firestore(app);

const title = document.getElementById('username').value.trim();
const author = document.getElementById('email').value.trim();
const published = document.getElementById('password').value.trim();

let query = db.collection("felhasznalok");

let regist = document.getElementById("regist");

regist.addEventListener("click", (e) => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, username, email, password).then((userCredentials) => {
        alert("Felhasználó sikeres regisztrálva");
        const user = userCredentials.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
});

