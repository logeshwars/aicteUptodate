import React, { useEffect, useState } from "react";
import "./ModifyEvents.css";
function Users() {
  const[users,setUsers]=useState([]);
  useEffect(() => {
    fetch("https://uptodatebackend.herokuapp.com/user/getalluser", {})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="modifyEvents">
      <div className="createEventTitle">
        <h3>Users Details</h3>
      </div>
      <div className="table">
        <table>
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>RollNO</th>
            <th>Department</th>
            <th>College</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Phone NO</th>
            <th>Gender</th>
          </tr>
          {users.map((u, index) => (
            <tr>
              <td>{index}</td>
              <td>{u.name}</td>
              <td>{u.rollno}</td>
              <td>{u.dept}</td>
              <td>{u.college}</td>
              <td>{u.city}</td>
              <td>{u.state}</td>
              <td>{u.mailid}</td>
              <td>{u.dob}</td>
              <td>{u.age}</td>
              <td>{u.phno}</td>
              <td>{u.gender}</td>
              {/* <td>
                <button
                 
                  className="tableUpdate tableDelete"
                  onClick={async () => {
                    //await deleteDoc(doc(db, "users", userid[index]));

                  }}
                >
                  Remove
                </button>
              </td> */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Users;
