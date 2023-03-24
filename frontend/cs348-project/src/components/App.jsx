// import './App.css';
import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verification from "./Verification";
import ToDoView from "./ToDoView";

function App() {
  let disableAuthentication = false;

  const [signedIn, setSignedIn] = useState(disableAuthentication ? true : false);
  function setSignIn(trueorfalse){
    setSignedIn(trueorfalse);
  }

  const [signUp, setSignUp] = useState(false);
  function setSignUpPage(trueorfalse){
    setSignUp(trueorfalse);
  }

  const [verification, setVerification] = useState(false);
  function setVerificationPage(trueorfalse){
    setVerification(trueorfalse);
  }

  const [user, setUser] = useState(null);
  function loadUser(id) {
    setUser(id);
  }

  // useEffect(() => {
  //   console.log(signUp);
  // }, [signUp]);

  return (
    <div className="App">
      {verification && <Verification setSignIn={setSignIn} setVerificationPage={setVerificationPage} />}
      {!verification && !signedIn && !signUp && 
        <SignIn 
          setSignIn={setSignIn} 
          setSignUpPage={setSignUpPage} 
          setVerification={setVerificationPage}
          loadUser={loadUser}
        />
      }
      {!verification && !signedIn && signUp && 
        <SignUp 
          setVerification={setVerificationPage} 
          setSignUpPage={setSignUpPage}
        />
      }
      {!verification && signedIn && 
        <ToDoView 
          setSignIn={setSignIn}
          user={user}
          loadUser={loadUser}
        />
      }
    </div>
  );
}

export default App;
