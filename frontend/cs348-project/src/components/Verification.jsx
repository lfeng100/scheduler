import React, { useState, useEffect } from "react";

function Verification(props) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    function dismissError(){
        setError("");
    }

    function verifyUser(event){
        setError("");
        let email = event.target[0].value;
        let code = event.target[1].value;
        const url = "http://127.0.0.1:8000/verify/";
        
        fetch(url, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: email,
                verificationCode: code
            })
        })
        .then(res => res.json())
        .then(msg => {
            setResponse(msg);
        });

        event.preventDefault();
    }

    function setVerificationPage(){
        props.setVerificationPage(false);
    }

    useEffect(() => {
        if(response !== null){
            if(response.msg === "success") {
                // props.setVerificationPage(false);
                // props.setSignIn(false);
            } else if (response.code === 406) { // Incorrect Verification Code
                setError("Incorrect Verification Code... Try Again!");
            } else if (response.code === 407) { // User Already Verified
                setError("This email has already been verified. Click on Sign In below.");
            } else {
                setError("Ensure the email/code you have entered is valid... Try Again!");
            }
        }
    }, [response]);

    return (
      <div className="d-flex justify-content-center">
          <div className='h-75 col-lg-4 my-5'>
            {(response === null || response.msg !== "success") &&
                <div>
                    <form onSubmit={verifyUser}>
                        <legend>Verify your WATodo Account!</legend>
                        <p>Check the email you signed up with for your verification code.</p>
                        {error.length > 0 &&
                            <p onClick={dismissError} className="error-msg"> { error + " (Click to Dismiss)" } </p>
                        }
                        <div className="my-3">
                            <label htmlFor="usernameOrEmail" className="form-label">Email address</label>
                            <input className="form-control" id="usernameOrEmail" required/>
                        </div>
                        <div className="my-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Verfication Code</label>
                            <input className="form-control" id="exampleInputPassword1" required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Verify Account</button>
                    </form>
                    <div className="my-2 d-flex">
                        <div className="text-secondary">Log In to a different an account?</div>
                        <div className="ms-auto"><a href="#" onClick={setVerificationPage} className="link-primary">Sign In</a></div>
                    </div>
                </div>
            }
            {response !== null && response.msg === "success" &&
                <div className="my-2 d-flex">
                    <legend>Account successfully verified!</legend>
                    <div className="text-secondary">Log In to your account</div>
                    <div className="ms-auto"><a href="#" onClick={setVerificationPage} className="link-primary">Sign In</a></div>
                </div>
            }
          </div>
      </div>
    );
  }
  
  export default Verification;