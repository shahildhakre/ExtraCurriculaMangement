
let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');
let todaydate = document.getElementById("Current-Date");
let todaydate1 = document.getElementById("Current-Date-1");
let todaydate2 = document.getElementById("Current-Date-2");
let todaydate3 = document.getElementById("Current-Date-3");
let todaydate4 = document.getElementById("Current-Date-4");
let todaydate5 = document.getElementById("Current-Date-5");
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyC-X2_EyEdw-TMh-ud3B62dViSx4rbMyos",
   authDomain: "event-managment-ac3bc.firebaseapp.com",
   databaseURL: "https://event-managment-ac3bc-default-rtdb.firebaseio.com",
   projectId: "event-managment-ac3bc",
   storageBucket: "event-managment-ac3bc.appspot.com",
   messagingSenderId: "397199509513",
   appId: "1:397199509513:web:91b2fcd04a8262be6090d8",
   measurementId: "G-THW922XRHK"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var database = firebaseApp.database();



const enableDarkMode = () => {
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if (darkMode === 'enabled') {
   enableDarkMode();
}

toggleBtn.onclick = (e) => {
   darkMode = localStorage.getItem('dark-mode');
   if (darkMode === 'disabled') {
      enableDarkMode();
   } else {
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () => {
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () => {
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () => {
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () => {
   profile.classList.remove('active');
   search.classList.remove('active');

   if (window.innerWidth < 1200) {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}


const SignUp = () => {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;

   // Regular expression for two specific domains (@gmail.com and @lnmiit.ac.in)
   const domainRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|lnmiit\.ac\.in)$/;

   if (!domainRegex.test(email)) {
      alert("Invalid email domain. Please use a valid email address from @gmail.com or @lnmiit.ac.in.");
      return;
   }

   console.log(email, password);

   firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
         // Signed in
         alert("SignUp Successful");
         window.location.assign("login.html");
         console.log(result);
         save();
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         alert(errorMessage);
         // ..
      });
}




const SignIn = () => {
   const email = document.getElementById("lemail").value;
   const password = document.getElementById("lpassword").value;
   console.log(email, password);


   firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
         // Signed in
         window.location.replace("home.html");
         console.log(result);
         // ...
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         alert(errorMessage);
      });
}
 

const SignOut = () => {
   firebase.auth().signOut().then((result) => {
      // Sign-out successful.
      // alert("SignOut Sucessfull");
      window.location.replace("login.html");
      console.log(result);

   }).catch((error) => {
      // An error happened.
   });
}





document.getElementsByClassName("option-btn")[0].innerHTML = "Logout";
document.getElementById("p-log").innerHTML = "LogIn";

document.getElementsByClassName("option-btn")[0].onclick = function () {
   SignOut();
}

document.getElementById("p-log").onclick = function () {
   window.location.assign("login.html");
}

function save() {
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var username = document.getElementById("username").value;
   var name = document.getElementById("name").value;

   database.ref('users/' + username).set({
      name: name,
      email: email,
      username: username
   })

}

var name1;
var usernameverification;
function get() {
   var username = document.getElementById("lusername").value;
   usernameverification = username;
   sessionStorage.setItem("usernameverification", usernameverification);

   var ref = firebase.database().ref("users/" + username);
   ref.once("value")
      .then(function (snapshot) {
         name1 = snapshot.child("name").val();
         // alert(name1);
         var passuser = username;
         sessionStorage.setItem("user", username);
         var passdata = name1;
         sessionStorage.setItem("nameshow", passdata);


      });
}

function update() {
   var name = document.getElementById("upname").value;
   var username = document.getElementById("usernameup").value;

   var updates = {
      name: name
   }

   database.ref('users/' + username).update(updates)

   alert('sucess');

   var ref = firebase.database().ref("users/" + username);
   ref.once("value")
      .then(function (snapshot) {
         name1 = snapshot.child("name").val();
         var passdata = name1;
         sessionStorage.setItem("nameshow", passdata);
         window.location.reload();


      });

}

function sendEmail() {
   (function () {
      emailjs.init("F2Xmzlfn7Pr3zHc6n");

   })();

   var params = {
      sendername: document.getElementById("conusername").value,
      message: document.getElementById("conbody").value,
      subject: document.getElementById("conroll").value

   };

   var serviceID = "service_67lcosw";
   var templateID = "template_nqftpop";

   emailjs.send(serviceID, templateID, params)
      .then(res => {
         alert("Sucess");
      })
      .catch();
}

function registerSpotlight() {

   var username = sessionStorage.getItem("usernameverification");

   let cnf = prompt('Enter Yes To Conform');

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'spotlight/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function registerDuolouge() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Duolouge/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function inkiit() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Inkiit/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function cricketInterYear() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Cricket/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }



}

function BasketballInterYear() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'basketball/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }



}

function polygon() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'polygon Guide/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function web3Talks() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Web3 Talk/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function Dules() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Dules/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function Enigma() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Enigma/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function avegGrp() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Aaveg/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function odeum() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Odeum/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function throughTheLens() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Through The Lenses/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function photoWorkshop() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Photography Workshop/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function sharkTank() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'Shark Tank LNM/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}

function startUp() {

   let cnf = prompt('Enter Yes To Conform');
   var username = sessionStorage.getItem("usernameverification");

   if (cnf.toLowerCase() === 'yes') {

      database.ref('events/' + 'StartUp Weekend/' + username).set({
         username: username,
      })
      location.reload();
   }
   else {
      alert('Registration Failed');
   }


}



function checkDataExistence() {
   var username = document.getElementById('lusername').value;
   var dataToCheck = document.getElementById('lusername').value;
   const dataRef = database.ref("users");
   dataRef.once("value")
      .then((snapshot) => {
         // Check if the data exists
         if (snapshot.val() && snapshot.val().hasOwnProperty(dataToCheck)) {
            console.log(`Data "${dataToCheck}" exists in the database.`);
            get();
            SignIn();
         } else {
            console.log(`Data "${dataToCheck}" does not exist in the database.`);
            alert('Invalid Username');
         }
      })
      .catch((error) => {
         console.error("Error reading data:", error);
      });
}

function checkUserExistence() {
   var username = document.getElementById('username').value;
   var dataToCheck = document.getElementById('username').value;
   const dataRef = database.ref("users");
   dataRef.once("value")
      .then((snapshot) => {
         // Check if the data exists
         if (snapshot.val() && snapshot.val().hasOwnProperty(dataToCheck)) {
            console.log(`Data "${dataToCheck}" exists in the database.`);
            alert('Username Exist');
         } else {
            console.log(`Data "${dataToCheck}" does not exist in the database.`);
            SignUp();
         }
      })
      .catch((error) => {
         console.error("Error reading data:", error);
      });
}

function restrictSpecialCharacters() {
   var inputField = document.getElementById('name').value;

   var inputValue = inputField;
   var isValid = /^[a-zA-Z\s]*$/.test(inputValue);

   if (isValid) {
      checkUserExistence();
   } else {
      alert('Invalid Name, only enter alphabets');
   };
}

function restrictSpecialCharactersInProfile() {
   var inputField = document.getElementById('upname').value;

   var inputValue = inputField;
   var isValid = /^[a-zA-Z\s]*$/.test(inputValue);

   if (isValid) {
      update();
   } else {
      alert('Invalid Name, only enter alphabets');
   };
}

function checkUsernameInContact() {

   var username = sessionStorage.getItem("usernameverification");
   var userInputUsername = document.getElementById('conusername').value;
   if (userInputUsername == username) {
      sendEmail();
   }
   else {
      alert('username not matched');
   }

}





























