
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCFjj2TpErZVY8UAW8vYudUSivqVxy0wKo",
    authDomain: "gatheringalaxy.firebaseapp.com",
    projectId: "gatheringalaxy",
    storageBucket: "gatheringalaxy.appspot.com",
    messagingSenderId: "639862837184",
    appId: "1:639862837184:web:b56be4ef49e3dbbcef4225"
};


const app = initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const title = document.getElementById('username').value.trim();
const author = document.getElementById('email').value.trim();
const published = document.getElementById('password').value.trim();
const available = document.getElementById('againp').value;

let query = db.collection("felhasznalok");

db.collection("felhasznalok").onSnapshot((querySnapshot) => {
    const documents = querySnapshot.docs;
    for (let i = 0; i < documents.length; i++) {
        console.log(documents[i].data());
    }
});

db.collection("felhasznalok").onSnapshot((querySnapshot) => {
    const messagesList = document.getElementById('konyv-list');
    messagesList.innerHTML = '';
    const documents = querySnapshot.docs;
    for (let i = 0; i < documents.length; i++) {
        let msg = documents[i].data();
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = `${msg.password}: ${msg.szoveg}: ${msg.stat}`;
        messagesList.appendChild(li);
    }
});

query.get().then((querySnapshot) => {
    const messagesList = document.getElementById('konyv-list');
    messagesList.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        messagesList.appendChild(li);
    });
    
}).catch((error) => {
    console.error("Hiba a regisztrálásnál: ", error);
});