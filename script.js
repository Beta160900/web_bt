// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, serverTimestamp, query, orderBy  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDGt-77ayuOIuXOXfJgyMlTdkeHDaZi-Is",
    authDomain: "learnfirebase-c4079.firebaseapp.com",
    projectId: "learnfirebase-c4079",
    storageBucket: "learnfirebase-c4079.appspot.com",
    messagingSenderId: "249247430464",
    appId: "1:249247430464:web:4de5bd0036a0b1da272ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/*
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const names = document.getElementById('fname').value;
    const comments = document.getElementById('lname').value;
    const commentTemplate = document.querySelector('#comment_template').cloneNode(true);
    commentTemplate.style.display = 'block'; // Ensure it's visible
    commentTemplate.querySelector('h2').textContent = `Name: ${names}`;
    commentTemplate.querySelector('p').textContent = `Comment: ${comments}`;
    document.getElementById("comment_field").appendChild(commentTemplate);
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
});
*/


document.addEventListener('DOMContentLoaded', () => {
    async function fetchComments() {
        try {
            const commentsQuery = query(collection(db,"comment"),orderBy("timestamp","desc"))
            const shot = await getDocs(commentsQuery);
            const commentsDiv = document.getElementById("comment_field");
            commentsDiv.innerHTML = '';
            shot.forEach((element) => {
                const data = element.data();
                const commentElement = document.createElement("div");
                commentElement.style.display = "block";
                commentElement.style.background = "white";
                commentElement.style.width = "80%";
                commentElement.style.borderRadius = "1dvh";
                commentElement.style.margin = "1% 1%";

                const nameElement = document.createElement("h2");
                nameElement.textContent = `Name: ${data.name}`;
                nameElement.style.wordWrap = "break-word";

                const textElement = document.createElement("p");
                textElement.textContent = `Comment: ${data.comment}`;
                textElement.style.wordWrap = "break-word";
                textElement.style.color = 'black';
                textElement.style.marginleft = '0';
                textElement.style.textAlign = 'left'; // Ensure text starts from the left
                textElement.style.marginLeft = '10px'; // Ensure no left margin
                textElement.style.marginBottom = '20px';
                textElement.style.whiteSpace = 'pre-line';

                commentElement.appendChild(nameElement);
                commentElement.appendChild(textElement);

                commentsDiv.appendChild(commentElement);
            });
        } catch (err) {
            console.error("Error fetching documents: ", err);
        }
    }

    async function addvalue(name1, comment1) {
        try {
            await addDoc(collection(db, "comment"), {
                name: name1,
                comment: comment1,
                timestamp: serverTimestamp()
            });
            console.log("Comment added successfully");
            fetchComments(); // Refresh comments after adding new one
        } catch (err) {
            console.error("Error adding comment: ", err);
        }
    }

    document.querySelector('#commentForm button').addEventListener('click', function () {
        // Get input values
        const names = document.getElementById('fname').value;
        const comments = document.getElementById('lname').value;

        if (names && comments) {
            addvalue(names, comments);
            // Clear form inputs
            document.getElementById('fname').value = '';
            document.getElementById('lname').value = '';
        } else {
            alert("Please fill in both fields");
        }
    });

    // Fetch comments when the DOM is fully loaded
    fetchComments();
});
