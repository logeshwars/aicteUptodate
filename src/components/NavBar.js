import React, { useEffect, useState } from "react";
import Login from "./Login";
import { auth } from "../firebase";
import "./NavBar.css";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
function NavBar({ admin, user }) {
  const [showLogin, setShowLogin] = useState(false);
  const showlogin = () => {
    if (showLogin) setShowLogin(false);
    else setShowLogin(true);
  };
  const signOut=()=>{
    auth
    .signOut()
    .then(() => {
    })
    .catch((error) => console.log(error.message));
  }
  return (
    <div className="navBar">
      {admin !== undefined && <Navigate to="admin" replace />}
      <div className="navBarInside">
        <div>
          <span className="logo">
            up<span className="logoMiddle">2</span>date
          </span>{" "}
          <span className="logoEvent">events</span>
        </div>
        <div className="searchBox">
          <input type="text" placeholder="search events here" />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        {user === undefined ? (
          <div className="loginButtonHolder">
            <button className="loginButton" onClick={() => showlogin()}>
              Sign In
            </button>
          </div>
        ) : (
          <div>
            <ul className="profile">
              <li>
                <div>
                  <img src={user.photo} alt="" />
                  <span>{user.name}</span>
                </div>
                <ul className="profileInner">
                  <li>
                    <span>My Events</span>
                  </li>
                  <li onClick={()=>signOut()}><span>Log out</span></li>
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="searchBox searchBoxMin">
        <input type="text" placeholder="search events here" />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
      {showLogin && <Login closeLogin={showlogin} />}
    </div>
  );
}

export default NavBar;
