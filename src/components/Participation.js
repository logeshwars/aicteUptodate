import React, { useEffect, useState } from "react";
import "./ModifyEvents.css";
import "./Participations.css";
function Participation() {
  const [userParticipations, setUserParticipations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [event, setEvent] = useState([]);
  const [userdata,setUserdata]=useState([]);
  const  [selectedEvent,setSelectedEvent]=useState({title:"Select Event"});
  useEffect(() => {
    fetch("https://uptodatebackend.herokuapp.com/event/getevent", {})
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[]);
  const handleChange =(e) => {
    setUserdata([]);
   fetch(`https://uptodatebackend.herokuapp.com/event/getparticipation?id=${e._id}`, {})
   .then((response) => {console.log(response);return response.json();})
   .then((data) => {
     setUserdata(data);
     console.log("Success:", data);
   })
   .catch((error) => {
     console.error("Error:", error);
   });
  };
  return (
    <div className="modifyEvents">
      <div className="createEventTitle">
        <h3>Participations</h3>
      </div>
      <div className="selectBox">
        <div
          className="selectBoxSelected"
          onClick={() => {
            setShowDropdown(true);
          }}
        >
          <span>
            <img src={selectedEvent.image_url} alt="" />
            {selectedEvent.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </span>
        </div>
        {showDropdown && (
          <div className="selectBoxDropDown">
            {event.map((e, index) => (
              <div
                key={index}
                className="selectBoxDropDownItem"
                onClick={() => {
                  setSelectedEvent(e);
                  setShowDropdown(false);
                  handleChange(e);
                }}
              >
                <span>
                  <img src={e.image_url} alt="" />
                  <span>{e.title}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="eventTitle">
        <h6>{selectedEvent.title}</h6>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Roll-No</th>
              <th>Department</th>
              <th>Mail id</th>
              <th>DOB</th>
              <th>Phone No</th>
              <th>College</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((ud, index) => (
              <tr key={index}>
                <td>1</td>
                <td>{ud.name}</td>
                <td> {ud.rollno}</td>
                <td>{ud.dept}</td>
                <td>{ud.dob}</td>
                <td>{ud.phno}</td>
                <td>{ud.mailid}</td>
                <td>{ud.college}</td>
                {/* <td>
                  <button
                    style={{ backgroundColor: "red", color: "white" }}
                    className="tableUpdate"
                  >
                    Remove
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Participation;
