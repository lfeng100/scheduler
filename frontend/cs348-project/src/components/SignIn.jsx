import React, { useState, useEffect } from "react";
// import sha256 from "crypto-js/sha256";
// import { MpSharp } from "@mui/icons-material";

function SignIn(props) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    function dismissError(){
        setError("");
    }

    function authenticateUser(event){
        setError("");
        let email = event.target[0].value;
        let password = event.target[1].value;
        
        const url = "http://127.0.0.1:8000/login";

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(msg => {
            setResponse(msg);
            // console.clear();
        });

        event.preventDefault();
    }

    useEffect(() => {
        // console.log(response);
        if(response !== null){
            if(Object.hasOwn(response, 'user_id')) {
                props.loadUser(response);
                props.setSignIn(true);
            } else if (response.code === 404) { // User not verified
                props.setVerification(true);
            } else if (response.code === 403) { // Incorrect Password
                setError("Incorrect Password... Try Again!");
            } else if (response.code === 402) { // Email does not exist
                setError("An account with that email doesn't exist... Try Again!");
            } else if (Object.hasOwn(response, 'errors')) { // Validator Email Error
                if (response.errors[0].param == "email") {
                    setError("Make sure you are using a valid email address... Try Again!");
                } else if (response.errors[0].param == "password") {
                    setError("Incorrect Password... Try Again!");
                }
            } else {
                setError("Invalid Credentials... Try Again!");
            }
        }
    }, [response]);

    function setSignUpPage(){
        props.setSignUpPage(true);
    }

    return (
      <div className="d-flex justify-content-center">
          <div className='h-75 col-lg-4 my-5'>
              <form onSubmit={authenticateUser}>
                  <legend>Sign in to access your WATodo!</legend>
                    {error.length > 0 &&
                        <p onClick={dismissError} className="error-msg"> { error + " (Click to Dismiss)" } </p>
                    }
                  <div className="my-3">
                      <label htmlFor="usernameOrEmail" className="form-label">Email address</label>
                      <input className="form-control" id="usernameOrEmail" required/>
                  </div>
                  <div className="my-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="on" required/>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Sign In</button>
              </form>
              <div className="my-2 d-flex">
				<div className="text-secondary">Don't have an account?</div>
				    <div className="ms-auto"><a href="#" onClick={setSignUpPage} className="link-primary">Create an account</a></div>
			    </div>
          </div>
      </div>
    );
  }
  
  export default SignIn;