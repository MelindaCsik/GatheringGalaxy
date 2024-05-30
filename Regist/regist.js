// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFjj2TpErZVY8UAW8vYudUSivqVxy0wKo",
    authDomain: "gatheringalaxy.firebaseapp.com",
    projectId: "gatheringalaxy",
    storageBucket: "gatheringalaxy.appspot.com",
    messagingSenderId: "639862837184",
    appId: "1:639862837184:web:b56be4ef49e3dbbcef4225"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let regist = document.getElementById("regist");

regist.addEventListener("click", (e) => {
    e.preventDefault(); 

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            alert("Sikeres felhasználó registrálás");
            const user = userCredentials.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error [${errorCode}]: ${errorMessage}`);
            alert(`Hiba: ${errorMessage} (Hibakód: ${errorCode})`);
        });
});
