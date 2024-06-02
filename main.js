const firebaseConfig = {
    apiKey: "AIzaSyCFjj2TpErZVY8UAW8vYudUSivqVxy0wKo",
    authDomain: "gatheringalaxy.firebaseapp.com",
    projectId: "gatheringalaxy",
    storageBucket: "gatheringalaxy.appspot.com",
    messagingSenderId: "639862837184",
    appId: "1:639862837184:web:b56be4ef49e3dbbcef4225"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("eventsContainer");

    db.collection("events").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const event = doc.data();
            const eventElement = document.createElement("div");
            eventElement.innerHTML = `
                <h4>${event.title}</h4>
                <p>${event.description}</p>
                <p>${new Date(event.date).toLocaleString()}</p>
                <button onclick="registerForEvent('${doc.id}')">Register</button>
            `;
            eventsContainer.appendChild(eventElement);
        });
    });
});

function registerForEvent(eventId) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection("eventRegistrations").add({
                eventId: eventId,
                userId: user.uid
            })
            .then(() => {
                alert("Successfully registered for the event.");
            })
            .catch((error) => {
                console.error("Error registering for event: ", error);
                alert("Error: " + error.message);
            });
        } else {
            alert("You must be logged in to register for an event.");
            window.location.href = "Login/login.html";
        }
    });
}
