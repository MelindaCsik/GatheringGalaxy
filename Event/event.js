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

document.getElementById("eventForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection("events").add({
                title: title,
                description: description,
                date: date,
                createdBy: user.uid
            })
            .then(() => {
                alert("Esemény sikeres létrehozása");
                window.location.href = "../mainpage.html";
            })
            .catch((error) => {
                console.error("Hiba az esemény létrehozásakor: ", error);
                alert("Error: " + error.message);
            });
        } else {
            alert("Be kell jelentkezned hogy egy eseményt tudjál létrehozni");
            window.location.href = "../Login/login.html";
        }
    });
});
