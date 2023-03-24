import React, { useState, useEffect } from "react";
// import sha256 from "crypto-js/sha256";
// import { off } from "npm";
// import { v4 as uuid } from 'uuid';

function SignUp(props) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    function dismissError(){
        setError("");
    }

    function makeUser(event){
        setError("");
        let fname = event.target[0].value;
        let lname = event.target[1].value;
        let email = event.target[2].value;
        let username = event.target[3].value.toLowerCase();
        let pass1raw = event.target[4].value;
        let pass2raw = event.target[5].value;

        const url = "http://127.0.0.1:8000/signup";

        if(handleCreateAccount(username, pass1raw, pass2raw, fname, lname, email)) {
            fetch(url, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: pass1raw,
                    name: fname + " " + lname,
                })
            })
            .then(res => res.json())
            .then(msg => {
                setResponse(msg);
                // console.clear();
            });
        }

        event.preventDefault();
    }

    useEffect(() => {
        // console.log(response);
        if(response !== null && response.user_id !== 'undefined') {
            if (response.user_id !== null && response.user_id !== undefined){
                props.setVerification(true);
                props.setSignUpPage(false);
            } else if (response.code === 401){
                setError("An account with that email or username already exists");
            } else if (response.code === 301){
                setError("An account with that email already exists");
            } else {
                setError("There was a problem with signing up, try again later!");
            }
        }
    }, [response]);

    function gotoSignUpPage(){
        props.setSignUpPage(false);
    }

    // Sign Up Check
    function handleCreateAccount(username, pass1raw, pass2raw, fname, lname, email){
        let specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let alphaNumeric = /^[a-z0-9]+$/i;

        // console.log("MATCH: " + (pass1raw.match(/\d/g) || []).length);
        // return false;
        if((fname.match(/\d/g) || []).length > 0 || (lname.match(/\d/g) || []).length > 0) {
            setError("Name should only contain alphabetic characters.");
            return false;
        } else if(fname.length > 50) {
            setError("First name field too long.");
            return false;
        } else if(lname.length > 50) {
            setError("Last name field too long.");
            return false;
        } else if(email.length > 200) {
            setError("Email field too long.");
            return false;
        } else if(!alphaNumeric.test(username)) {
            setError("Username must be alphanumeric [letters and numbers]");
            return false;
        } else if (username.length < 6) {
            setError("Username too short (6-18 characters)");
            return false;
        } else if (username.length > 18) {
            setError("Username too long (8-18 characters)");
            return false;
        } else if (pass1raw.length < 8) {
            setError("Password too short (8-32 characters)");
            return false;
        } else if (pass1raw.length > 32) {
            setError("Password too long (8-32 characters)");
            return false;
        } else if ((pass1raw.match(/[A-Z]/g) || []).length < 2) {
            setError("Password must contain at least 2 upper case character");
            return false;
        } else if ((pass1raw.match(/[a-z]/g) || []).length < 2) {
            setError("Password must contain at least 2 lower case character");
            return false;
        } else if((pass1raw.match(/\d/g) || []).length < 2) {
            setError("Password must contain at least 2 numbers");
            return false;
        } else if(!specialChar.test(pass1raw)) {
            setError("Password must contain at least 1 special character (i.e. !, @, #, etc.)");
            return false;
        } else if (pass1raw !== pass2raw) {
            setError("Passwords don't match");
            return false;
        }
        return true;
    }
    
    return (
      <div className="d-flex justify-content-center">
          <div className='h-75 col-lg-4 my-5'>
              <form onSubmit={makeUser}>
                  <legend>Create an account to get started with Wa-To-Do!</legend>
                  <div className="my-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input className="form-control" id="firstName" required/>
                  </div>
                  <div className="my-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input className="form-control" id="lastName" required/>
                  </div>
                  <div className="my-3">
                      <label htmlFor="userEmail" className="form-label">Email address</label>
                      <input type='email' className="form-control" id="userEmail" required/>
                  </div>
                  <div className="my-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input className="form-control" id="username" required/>
                  </div>
                  <div className="my-3">
                      <label htmlFor="userPassword" className="form-label">Password</label>
                      <input type="password" className="form-control" id="userPassword" autoComplete="on" required/>
                  </div>
                  <div className="my-3">
                      <p>Password must contain at least <b>2</b> of each:</p>
                      <p>lower case letter, upper case letter, number</p>
                      <p>And at least <b>1</b> special symbol (i.e. !, @, #, ...)</p>
                  </div>
                  <div className="my-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmPassword" autoComplete="on" required/>
                  </div>
                  {error.length > 0 &&
                      <p onClick={dismissError} className="error-msg"> { error + " (Click to Dismiss)" } </p>
                  }
                  <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <div className="my-2 d-flex">
                  <div className="text-secondary">Already have an account?</div>
                  <div className="ms-auto"><a href="#" onClick={gotoSignUpPage} className="link-primary">Sign In</a></div>
              </div>
          </div>
      </div>
    );
  }
  
  export default SignUp;