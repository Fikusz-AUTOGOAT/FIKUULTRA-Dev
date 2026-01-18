// 🔥 TWOJA KONFIGURACJA FIREBASE (ZROBISZ ZA 2 MINUTY)
const firebaseConfig = {
    apiKey: "TU_WKLEJ_API_KEY",
    authDomain: "twojprojekt.firebaseapp.com",
    databaseURL: "https://twojprojekt-default-rtdb.firebaseio.com",
    projectId: "twojprojekt",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function playSong(id) {
    const ref = db.ref("songs/" + id);

    ref.get().then(snapshot => {
        let views = snapshot.exists() ? snapshot.val() : 0;
        ref.set(views + 1);
    });
}

// 🔁 aktualizacja na żywo
db.ref("songs").on("value", snapshot => {
    const data = snapshot.val();
    if (!data) return;

    for (let id in data) {
        document.getElementById(id).innerText = data[id];
    }
});
