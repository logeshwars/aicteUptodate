import React, { useState, useEffect } from "react";
import "./ModifyEvents.css";
function ClosedEvents() {
  const[events,setEvents]=useState([])
  useEffect(() => {
    fetch("https://uptodatebackend.herokuapp.com/event/getevent", {})
      .then((response) => response.json())
      .then((data) => {
        setEvents(data)//.filter((d)=>!d.ended));
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[]);
  const handleDelete=(id)=>{
    fetch(
      "https://uptodatebackend.herokuapp.com/event/endevent",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id}),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
}
    return (
        <div className='modifyEvents'>
            <div className="createEventTitle">
        <h3>Close Events</h3>
        </div>
        <div className='table addScroll'>
            <table>
                <tr>
                    <th>NO</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Cordinator</th>
                    <th>Category</th>
                    <th>Guest Name</th>
                    <th>Guest Organisation</th>
                    <th>Guest Field</th>
                    <th>Guest Email</th>
                    <th>Guest Experience</th>
                    <th>End Event</th>
                </tr>
             {events.map((e,index)=>
                (<tr key={index}>
                    <td>{index}</td>
                    <td>{e.title}</td>
                    <td><p className='tableWrap'>{e.description}
                    </p>
                    </td>
                    <td>{e.start_date}</td>
                    <td>{e.end_date}</td>
                    <td>{e.time}</td>
                    <td>{e.duration}</td>
                    <td>{e.coordinator_name}</td>
                    <td>{e.category}</td>
                    <td>{e.guest_name}</td>
                    <td>{e.guest_organisation}</td>
                    <td>{e.guest_field}</td>
                    <td>{e.guest_email}</td>
                    <td>{e.guest_exp}</td>
                    <td>
                <button className="tableUpdate tableDelete" onClick={handleDelete(e._id)}>
                  Close
                </button>
              </td>
                </tr>))} 
            </table>
        </div>
        </div>
    )

}

export default ClosedEvents;
