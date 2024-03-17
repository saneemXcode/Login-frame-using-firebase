import React, { Component } from 'react';
import Login from './login-frame/Login';
import './App.css';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Register from './login-frame/Register';

const firebaseConfig = {
  apiKey: "AIzaSyCTJ9Efhkcl82gjpWQ413aV91qmpirDdS8",
  authDomain: "saneexcode-survey.firebaseapp.com",
  projectId: "saneexcode-survey",
  storageBucket: "saneexcode-survey.appspot.com",
  messagingSenderId: "384433609214",
  appId: "1:384433609214:web:be51eca173137a026688af"
};

const app = firebase.initializeApp(firebaseConfig);
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
    clearTimeout(this.messageTimeout); 
    this.messageTimeout = setTimeout(() => {
      this.setState({ message: '' });
    }, 5000); 
  };
  
  pageSwitchHandler = () => {
    this.setState({ isRegister: true }, () => {
      this.messageclear();
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

        this.setState({ message: "Registered successfully ! verification as sent to email please check it", type: 1 }, () => {
          this.setState({name:data.user.email});
          event.target.email.value = "";
          event.target.password.value = "";
          event.target.confirmpassword.value = "";
          this.messageclear(); 
        });
        console.log(data);
      })
      .catch((error) => {
        let errorMessage = error.message.replace(/\(auth\/.*?\)/, '');
        errorMessage = errorMessage.replace('Firebase: ', '');

        if (error.code === 'auth/email-already-in-use') {
          this.setState({ message: "Email already exists", type: 0 }, () => {
            event.target.email.value = "";
            event.target.password.value = "";
            event.target.confirmpassword.value = "";
            this.messageclear(); 
          });
        } else {
          this.setState({ message: errorMessage, type: 0 }, () => {
            event.target.email.value = "";
            event.target.password.value = "";
            event.target.confirmpassword.value = "";
            this.messageclear(); 
          });
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
            event.target.email.value = "";
            event.target.password.value = "";
            this.messageclear(); 
          });
        } else {
          this.setState({ message: "Your email is not verified yet", type: 0 },()=>{
            this.messageclear();
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
      
        if (errorCode === "auth/invalid-credential") {
          this.setState({ message: "Invalid email or password", type: 0 },()=>{
            this.messageclear();
          });
        } else if (errorCode === "auth/user-not-found") {
          this.setState({ message: "Account does not exist", type: 0 },()=>{
            this.messageclear();
          });
        } else if (errorCode === "auth/wrong-password") {
          this.setState({ message: "Incorrect password", type: 0 },()=>{
            this.messageclear();
          });
        } 
      });
  };

  googleHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.setState({ message: "Google sign-in successful", type: 1 },()=>{
          this.messageclear();
        });
      })
      .catch((error) => {
        this.setState({ message:"Failed to Login ",type: 0 },()=>{

        });
      });
  };

  render() {
    return (
      <div>
        {
          !this.state.isRegister ? (
            <Login
              message={this.state.message}
              type={this.state.type}
              login={this.SignInHandler}
              messageclear={this.messageclear}
              name={this.state.name}
              pageSwitch={this.pageSwitchHandler}
              Google={this.googleHandler}
            />
          ) : (
            <Register 
              register={this.SignUpHandler}
              message={this.state.message}
              type={this.state.type}
            />
          )
        }
      </div>
    );
  }
}

export default App;
