import React, {useState } from "react";
import "./Login.css";
import { provider} from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Register from "./Register";
function Login({ closeLogin }) {
  
  const [showRegister, setShowRegister] = useState(false);
  const login = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        closeLogin()
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="popup">
      {!showRegister ? (
        <div className="login">
          <div className="logoContainer">
            <span className="logo">
              up<span className="logoMiddle">2</span>date
            </span>
            <button className="closeLogin" onClick={() => closeLogin()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="loginTitle">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </div>
            <h3>Login</h3>
          </div>
          <div className="signIn">
            <button onClick={() => login()}>
              <img
                src="https://image.flaticon.com/icons/png/128/281/281764.png"
                alt=""
              />
              Sign In with google
            </button>
          </div>
          <div className="gotoRegister">
            <button onClick={()=>setShowRegister(true)}>
              <span>If you are new ! Register first</span>
            </button>
          </div>
        </div>
      ) : (
        <Register closeLogin={closeLogin}/>
      )}
    </div>
  );
}

export default Login;
