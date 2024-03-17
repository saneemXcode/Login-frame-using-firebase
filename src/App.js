import React, { Component } from 'react'
import Login from './login-frame/Login';
import './App.css';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Register from './login-frame/Register'

const firebaseConfig = {
  apiKey: "AIzaSyCTJ9Efhkcl82gjpWQ413aV91qmpirDdS8",
  authDomain: "saneexcode-survey.firebaseapp.com",
  projectId: "saneexcode-survey",
  storageBucket: "saneexcode-survey.appspot.com",
  messagingSenderId: "384433609214",
  appId: "1:384433609214:web:be51eca173137a026688af"
};

const app = firebase.initializeApp(firebaseConfig); // Correctly initialize Firebase app
const auth = getAuth(app);



export class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       message:"",
       type:1,
       name:'',
       great:1,
       isRegister:false, 
    }
  }
  
  messageclear = () => {
    this.setState({ message: '' });
  };
  
  pageSwitchHandler = () => {
    this.setState({ isRegister: true }, () => {
      this.messageclear(); // Clear message when switching to register page
    });
  }
  SignUpHandler = (event) => {
    event.preventDefault();
   
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmpassword.value;

   
    if (!email) {
      this.setState({ message: "Please enter your email", type: 0 });
      return;
    }
  
    if (!password) {
      this.setState({ message: "Please enter a password", type: 0 });
      return;
    }
  
    if (!confirmPassword) {
      this.setState({ message: "Please confirm your password", type: 0 });
      return;
    }
  
    if (password !== confirmPassword) {
      this.setState({ message: "Passwords do not match", type: 0 });
      return;
    }
    
    const promise = createUserWithEmailAndPassword(auth, email, password);

    promise
      .then((data) => {

        const auth = getAuth();
        sendEmailVerification(auth.currentUser)
          .then(() => {
           
          });

      this.setState({ message: "Registered successfully ! verification as sent to email please check it", type: 1 },()=>{
       this.setState({name:data.user.email})
        event.target.email.value=""
        event.target.password.value=""
        event.target.confirmpassword.value=""
      });
      console.log(data)      
      })
  
    
      .catch((error) => {
        let errorMessage = error.message.replace(/\(auth\/.*?\)/, ''); // Remove (auth/...) part
        errorMessage = errorMessage.replace('Firebase: ', ''); // Remove Firebase: prefix
        console.error("Firebase Error:", errorMessage.trim());
  
        // Check if the error code indicates that the email already exists
        if (error.code === 'auth/email-already-in-use') {
          this.setState({ message: "Email already exists", type: 0 });
        } else {
          this.setState({ message: errorMessage, type: 0 });
        }
      });
  };
  SignInHandler=(event)=>{
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (!email) {
      this.setState({ message: "Please enter your email", type: 0 });
      return;
    }
  
    if (!password) {
      this.setState({ message: "Please enter a password", type: 0 });
      return;
    }
  
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth,email, password)
      .then((data) => {
        if(data.user.emailVerified===true){
          this.setState({ message: "Login successful", type: 1},()=>{  
          })
        }
       else{
        this.setState({ message: "Your email is not verified yet", type: 0 })
       }
      
      })
    
     
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      
        if (errorCode === "auth/invalid-credential") {
          this.setState({ message: "Invalid email or password", type: 0 });
        } else if (errorCode === "auth/user-not-found") {
          this.setState({ message: "Account does not exist", type: 0 });
        } else if (errorCode === "auth/wrong-password") {
          this.setState({ message: "Incorrect password", type: 0 });
        } 
        
      });
     
      

  }
 
  
  googleHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
       
        this.setState({ message: "Google sign-in successful", type: 1 });
      })
      .catch((error) => {
        // Handle error
        console.error("Error signing in with Google:", error);
        this.setState({ message: error.message, type: 0 });
      });
  };

      
      

  
  render() {
    return (
      
    
      <div>
     {
         !this.state.isRegister?(
        <Login
          message={this.state.message}
          type={this.state.type}
          login={this.SignInHandler}
          messageclear={this.messageclear}
          name={this.state.name}
          pageSwitch={this.pageSwitchHandler}
        />
         ):(
      

     <Register 
     register={this.SignUpHandler}
     message={this.state.message}
     type={this.state.type}
     Google={this.googleHandler}
     />
         )
  }
    </div>
    )
  }
}

export default App;