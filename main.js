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

document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("eventsContainer");

    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection("events").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const event = doc.data();
                    const eventElement = document.createElement("div");
                    eventElement.innerHTML = `
                        <h4>${event.title}</h4>
                        <p>${event.description}</p>
                        <p>${new Date(event.date).toLocaleString()}</p>
                        ${event.createdBy === user.uid ? `
                            <button onclick="deleteEvent('${doc.id}')">Törlés</button>
                        ` : ''}
                        <button onclick="registerForEvent('${doc.id}')">Regisztráció</button>
                    `;
                    eventsContainer.appendChild(eventElement);
                });
            });
        }
    });
});

function registerForEvent(eventId) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection("eventRegistrations").add({
                eventId: eventId,
                userId: user.uid
            })
            .then(() => {
                alert("Sikeresen regisztráltál erre az eseményre.");
            })
            .catch((error) => {
                console.error("Hiba az esemény regisztrálásánál: ", error);
                alert("Hiba: " + error.message);
            });
        } else {
            alert("Be kell jelentkezned ahhoz hogy regisztrálni tudjál egy eseményre.");
            window.location.href = "Login/login.html";
        }
    });
}

function deleteEvent(eventId) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection("events").doc(eventId).delete()
                .then(() => {
                    alert("Az esemény sikeresen törölve");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Hiba az esemény törlésekor: ", error);
                    alert("Hiba: " + error.message);
                });
        }
    });
}
