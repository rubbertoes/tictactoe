// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Firestore Converter
export const boardConverter = {
    toFirestore: (game) => {
        return {
            history: game.history.map(turn => ({ state: turn})),
                //convert history into an array of objects, where the each object
                //has a property called state, which is assigned one turn from the game history
            numMoves: game.numMoves,
            winner: game.winner,
            elapsedTime: game.elapsedTime
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            history: data.history.map(turn => turn.state),
            numMoves: data.numMoves,
            winner: data.winner,
            elapsedTime: data.elapsedTime
        };
    }
};


// Save game data to firebase
export const saveGame = async ( history_, numMoves_, winner_, elapsedTime_) => {
    try { 
        const gameRef = doc(collection(db, "Game_Data").withConverter(boardConverter));

        const gameData = {
            history: history_,
            numMoves: numMoves_,
            winner: winner_,
            elapsedTime: elapsedTime_
        }

        await setDoc(gameRef, gameData)

        console.log("Document written with ID: ", gameRef.id);
    } catch(error){
        console.log("Error saving game.", error);
    }
}

export const getGameData = async (gameID) => {
    try{
        
    } catch(error){
        console.log("Error saving game.", error);
    }
};