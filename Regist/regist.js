const firebaseConfig = {
    apiKey: "AIzaSyCFjj2TpErZVY8UAW8vYudUSivqVxy0wKo",
    authDomain: "gatheringalaxy.firebaseapp.com",
    projectId: "gatheringalaxy",
    storageBucket: "gatheringalaxy.appspot.com",
    messagingSenderId: "639862837184",
    appId: "1:639862837184:web:b56be4ef49e3dbbcef4225"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("registrationForm").addEventListener("submit", (e) => {
    e.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            alert("Sikeres felhasználó registrálás");
            const user = userCredentials.user;
            console.log(user);

            return db.collection("felhasznalok").doc(user.uid).set({
                email: user.email,
                username: username,
                uid: user.uid,
                registrationDate: new Date().toISOString()
            });
        })
        .then(() => {
            console.log("Felhasználói adatok elmentve!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Hiba [${errorCode}]: ${errorMessage}`);
            alert(`Hiba: ${errorMessage} (Hibakód: ${errorCode})`);
        });
});
