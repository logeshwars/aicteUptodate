import React, { useEffect } from "react";
import { useState } from "react";
import "./ManageHalls.css";
function ManageHalls() {
  const [name, setName] = useState("");
  const [no, setNo] = useState("");
  const [floor, setFloor] = useState("");
  const [block, setBlock] = useState("");
  const [capcity, setCapcity] = useState("");
  const [college, setCollege] = useState("");
  const [loc, setLoc] = useState("");
  const [facility, setFacility] = useState("");
  const [hall, setHall] = useState([]);
  useEffect(() => {
    fetch("https://uptodatebackend.herokuapp.com/event/getevent", {})
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch("https://uptodatebackend.herokuapp.com/hall/gethall", {})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHall(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: name,
      no: no,
      floor: floor,
      block: block,
      bookedDate: new Date("01/01/2000"),
      capcity: capcity,
      clg_name: college,
      location: loc,
      facility: facility,
    };
    fetch("https://uptodatebackend.herokuapp.com/hall/createhall", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setName("");
        setBlock("");
        setCapcity("");
        setFloor("");
        setLoc("");
        setNo("");
        setFacility("");
        setCollege("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="modifyEvents">
      <div className="createEventTitle">
        <h3>Manage Halls</h3>
      </div>
      <div className="table addScroll">
        <table>
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>Hall No</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Capcity</th>
              <th>College Name</th>
              <th>location</th>
              <th>Facility</th>
            </tr>
          </thead>
          <tbody>
            <tr className="mangehallsCreate">
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter hall name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={no}
                  onChange={(e) => setNo(e.target.value)}
                  placeholder="Enter hall no"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="Enter Floor"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="Enter block name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={capcity}
                  onChange={(e) => setCapcity(e.target.value)}
                  placeholder="Enter capcity"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter collge name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  placeholder="Enter location"
                />
              </td>
              <td>
                <textarea
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  placeholder="Describe the facility"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br></br>
      <div className="eventInside eventCenterButton">
        <form onSubmit={(e) => handleSubmit(e)}>
          <button className="eventCreate">Create</button>
        </form>
      </div>
      <div className="table addScroll">
        <table>
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>Hall No</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Capcity</th>
              <th>College Name</th>
              <th>location</th>
              <th>Facility</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {hall.map(h=>(
              <tr><td>{h.name}</td>
              <td>{h.no}</td>
              <td>{h.floor}</td>
              <td>{h.block}</td>
              <td>{h.capcity}</td>
              <td>{h.clg_name}</td>
              <td>{h.location}</td>
              <td>{h.facility}</td>
              <td>modify</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageHalls;
