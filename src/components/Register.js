import React, { useState } from 'react'
import './Register.css'
import { provider,db } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection,doc, setDoc, Timestamp } from "firebase/firestore"; 
function Register({closeLogin}) {
    const[name,setName]=useState();
    const[roll,setRoll]=useState();
    const[depart,setDepart]=useState();
    const[section,setSection]=useState();
    const[year,setYear]=useState();
    const[phone,setPhone]=useState();
    const[finish,setFinish]=useState(false)
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        setFinish(true);
    }
    const register = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(db);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const send= async()=>{
           
            const newuserRef = doc(collection(db, "users"));
            const data={
                name: name,
                rollno: roll,
                department:depart,
                section:section,
                year:year,
                phone:phone,
                date:  Timestamp.fromDate(new Date("December 10, 1815")),
                email:result.user.email,
                photo:result.user.photoURL,
                
              }
              await setDoc(newuserRef , data).then(()=>{
                  setFinish(false);
                  closeLogin();

              });
            }
          send();
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
        <div className="register">
             <button className="closeLogin closeRegister" onClick={() => closeLogin()}>
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
              <h3>Join us</h3>
              {!finish?(
              <form className="register box" onSubmit={(e)=>handleSubmit(e)}>
            <div className="registerInputs">
            
                <div><label>Name</label>
             <input onChange={(e)=>{setName(e.target.value)}} required type="text" placeholder="Enter your Name"/></div>
             <div>
             <label>Roll-no</label>
             <input onChange={(e)=>{setRoll(e.target.value)}}  required type="text" placeholder="Enter your Rollno"/>
             </div>
             <div>
             <label>Department</label>
             <input onChange={(e)=>{setDepart(e.target.value)}}  required type="text" placeholder="Enter your Department"/>
             </div>
             <div>
             <label>Section</label>
             <input onChange={(e)=>{setSection(e.target.value)}}  required type="text" placeholder="Enter your section"/>
             </div>
             <div>
             <label>Year</label>
             <input onChange={(e)=>{setYear(e.target.value)}}  required type="text" placeholder="Enter your year"/>
             </div>
             <div>
             <label>Phone-no</label>
             <input onChange={(e)=>{setPhone(e.target.value)}}  required type="number" placeholder="Enter your phone"/>
             </div>
            </div>
            <div className='registerFooter'><button>Sign Up</button></div>
            </form>):(<>
            <div className='finishRegister'><span>sign up with google to finish register</span></div>
            <div className="signIn">
            <button onClick={() =>register()}>
              <img
                src="https://image.flaticon.com/icons/png/128/281/281764.png"
                alt=""
              />
              Sign Up with google
            </button>
          </div></>)
       }
        </div>
    )
}

export default Register
