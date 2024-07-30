
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL,listAll } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
const storage = getStorage(app);

// Function to upload file to Firebase Storage
function uploadFile(inputId) {
    const fileInput = document.getElementById(inputId);
    const file = fileInput.files[0];

    if (file) {
        // Get the ID of the element to use as the folder name
        const folderName = inputId;

        // Create a storage reference
        const storageRef = ref(storage,`${folderName}/${file.name}`);

        // Upload the file
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a file!', snapshot);
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
            alert('File upload complete. Refresh the page to view your file.');
        }).catch((error) => {
                console.error('Error uploading file:', error);
        });
    } else {
        alert('No file selected!');
    }
}

window.uploadFile = uploadFile;

function display_file(container_id,floder_name){
    const fileContainer = document.getElementById(container_id);
    const pdfsRef = ref(storage, `${floder_name}/`);
  
    // List all items in the 'pdfs' directory
    listAll(pdfsRef).then((res) => {
      fileContainer.innerHTML = ''; // Clear previous content
  
      res.items.forEach((itemRef) => {
        // Get the download URL for each file
        getDownloadURL(itemRef).then((downloadURL) => {
          const iframe = document.createElement('iframe');
          iframe.src = downloadURL;
          iframe.width = '600';
          iframe.height = '800';
          iframe.style.border = 'none';
          iframe.style.margin = '20px';
          fileContainer.appendChild(iframe);
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      });
    }).catch((error) => {
      console.error('Error listing files:', error);
    });
}

function displayFiles(){
    display_file('field_4_1_science','file_4_1_science');
    display_file('field_4_1_thai','file_4_1_thai');
    display_file('field_4_1_english','file_4_1_english');
    display_file('field_4_1_social','file_4_1_social');
    display_file('field_4_1_biology','file_4_1_biology');
    display_file('field_4_1_chemist','file_4_1_chemist');
    display_file('field_4_1_physic','file_4_1_physic');
    display_file('field_4_2_science','file_4_2_science');
    display_file('field_4_2_thai','file_4_2_thai');
    display_file('field_4_2_english','file_4_2_english');
    display_file('field_4_2_social','file_4_2_social');
    display_file('field_4_2_biology','file_4_2_biology');
    display_file('field_4_2_chemist','file_4_2_chemist');
    display_file('field_4_2_physic','file_4_2_physic');
}
window.onload = displayFiles;