import React, { useEffect, useState } from "react";
import "./CreateEvent.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import Halls from "./Halls";
function CreateEvent() {
  const [shareImage, setShareImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cordi, setCordi] = useState("");
  const [time, setTime] = useState("");
  const [clg, setClg] = useState("");
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [duration, setDuration] = useState("");
  const [gurl, setGurl] = useState("");
  const [loc, setLoc] = useState("");
  const [category, setcategory] = useState("");
  const [venue, setVenue] = useState("");
  const [guesname, setGuesname] = useState("");
  const [guesorg, setGuesorg] = useState("");
  const [guesfield, setGuesfield] = useState("");
  const [guesexp, setGuesexp] = useState("");
  const [guesmail, setGuesmail] = useState("");
  const [downloadUrl, setdownloadURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [halls, setHalls] = useState([]);
  const [booked, setBooked] = useState("");
  useEffect(() => {
    fetch("https://uptodatebackend.herokuapp.com/hall/getavailhall", {})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHalls(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image ,this file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const storage = getStorage();
    const upload = ref(storage, `images/${shareImage.name}`);

    const uploadTask = uploadBytesResumable(upload, shareImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "running":
            setLoading(true);
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setdownloadURL(downloadURL);
          const send = async () => {
            const data = {
              image_url: downloadURL,
              title: title,
              description: desc,
              start_date: sDate,
              end_date: eDate,
              time: time,
              duration: duration,
              google_form_link: gurl,
              coordinator_name: cordi,
              category: category,
              guest_name: guesname,
              guest_organisation: guesorg,
              guest_field: guesfield,
              guest_exp: guesexp,
              guest_email: guesmail,
              hallid: booked,
            };
            await fetch(
              "https://uptodatebackend.herokuapp.com/event/createevent",
              {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              })
              .then(() => {
                //  setTitle("")
                //  setCordi("")
                //  setClg("");
                //  setDuration("");
                //  setVenue("");
                //  setcategory("");
                //  setDesc("");
                //  setdownloadURL("");
                //  setShareImage("");
                //  setSDate("");
                //  setEDate("");
                //  setLoc("");
                //  setLoading(false);
              });
          };
          send();
        });
      }
    );
  };
  console.log(sDate, eDate);
  return (
    <div className="createEvent">
      <div className="createEventTitle">
        <h3>Create Event</h3>
        <div className="eventInputs">
          <div className="eventInside">
            <label>
              <span>Event Image</span>
              <input
                type="file"
                accept="image/gif,image/jpeg"
                name="image"
                id="image"
                style={{ display: "none" }}
                onChange={handleImage}
              />
              {!shareImage && (
                <p>
                  <label className="upImage" htmlFor="image">
                    Select a image for Poster
                  </label>
                </p>
              )}
              {shareImage && (
                <img
                  className="uploadedImg"
                  alt=""
                  src={URL.createObjectURL(shareImage)}
                />
              )}
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Event Title</span>
              <input
                required
                value={title}
                placeholder="Enter the Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Category</span>
              <select
                required
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option>Talk</option>
                <option>Seminar</option>
                <option>Webinar</option>
                <option>Contest</option>
              </select>
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Cordinator</span>
              <input
                required
                value={cordi}
                placeholder="Enter Cordinator Name"
                onChange={(e) => setCordi(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Time</span>
              <input
                required
                value={time}
                placeholder="Enter the Time"
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Duration</span>
              <input
                required
                value={duration}
                placeholder="Enter Time Duration"
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Google form link</span>
              <input
                required
                value={gurl}
                placeholder="Enter url"
                onChange={(e) => setGurl(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Guest Name</span>
              <input
                required
                value={guesname}
                placeholder="Enter Guest Name"
                onChange={(e) => setGuesname(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Guest Organisation</span>
              <input
                required
                value={guesorg}
                placeholder="Enter the Orgnanisation"
                onChange={(e) => setGuesorg(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Guest field</span>
              <input
                required
                value={guesfield}
                placeholder="Enter the field"
                onChange={(e) => setGuesfield(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Guest experince</span>
              <input
                required
                value={guesexp}
                placeholder="Enter the experince"
                onChange={(e) => setGuesexp(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Guest Email</span>
              <input
                required
                value={guesmail}
                placeholder="Enter the email"
                onChange={(e) => setGuesmail(e.target.value)}
              />
            </label>
          </div>
          <div className="eventInside">
            <label>
              <span>Start Date</span>
              <input
                required
                value={sDate}
                placeholder="Start Date"
                type="text"
                onChange={(e) => setSDate(e.target.value)}
              />
            </label>
          </div>{" "}
          <div className="eventInside">
            <label>
              <span>End Date</span>
              <input
                required
                value={eDate}
                placeholder="End Date"
                type="text"
                onChange={(e) => {
                  setEDate(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="eventInside eventDesc">
            <label>
              <span>Event Decription</span>
              <textarea
                required
                value={desc}
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div>
            <div className="hallSlider addScroll">
              {halls.map((h) => (
                <Halls
                  name={h.name}
                  no={h.no}
                  clg={h.clg_name}
                  location={h.location}
                  block={h.block}
                  capcity={h.capcity}
                  facility={h.facility}
                  floor={h.floor}
                  booked={booked}
                  setBooked={setBooked}
                  id={h._id}
                />
              ))}
            </div>
          </div>
          <div className="eventInside eventCenterButton">
            <form onSubmit={(e) => handleSubmit(e)}>
              {" "}
              <button className="eventCreate">Create</button>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="popup" style={{ backgroundColor: "white" }}>
          <img
            width={500}
            src="https://miro.medium.com/max/1400/0*ptDX0HfJCYpo9Pcs.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default CreateEvent;
