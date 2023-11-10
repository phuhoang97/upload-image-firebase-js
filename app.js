const firebaseConfig = {
  apiKey: "AIzaSyAoX13k1T0C09odtFRL3Lr3kBYbpghHE_o",
  authDomain: "fir-upload-image-js.firebaseapp.com",
  projectId: "fir-upload-image-js",
  storageBucket: "fir-upload-image-js.appspot.com",
  messagingSenderId: "134041764407",
  appId: "1:134041764407:web:2b90e322e695fcc22a75b2",
  measurementId: "G-FVZT8VQHER",
};

firebase.initializeApp(firebaseConfig);

const fileText = document.querySelector(".fileText");
const uploadPerrcentage = document.querySelector(".uploadPercentage");
const progress = document.querySelector(".progress");
let percentVal;
let fileItem;
let fileName;
let img = document.querySelector(".img");

function getFile(e) {
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

function uploadImage() {
  let storageRef = firebase
    .storage()
    .ref()
    .child("images/" + fileName);
  let uploadTask = storageRef.put(fileItem);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      percentVal = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      uploadPercentage.innerHTML = percentVal + "%";
      progress.style.width = percentVal + "%";
    },
    (err) => {
      console.log(err);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
        if (url != "") {
          img.setAttribute("src", url);
          img.style.display = "block";
        }
      });
    }
  );
}
