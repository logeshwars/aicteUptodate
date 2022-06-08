import React,{useEffect, useState } from "react";
import "./Admin.css";
import CreateEvent from "./CreateEvent";
import ModifyEvents from "./ModifyEvents";
import DeleteEvents from "./DeleteEvents";
import ClosedEvents from "./ClosedEvents";
import Users from "./Users";
 import Participation from "./Participation";
import EditEvents from "./EditEvents";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AdminNav from "./AdminNav";
import ManageHalls from "./ManageHalls";
function Admin() {
  const [navNo, setNavNo] = useState(1);
  const [showNav,setShowNav]=useState(false);
  const [editEventId,setEditEventId]=useState("");
  const slideLeft={  left:-280+"px"}
  const slideRight={  left:0+"px"}
  const notify = () => toast.success("Done Successfully");
  const deleted = () => toast.error("Deleted Successfully");
  const setNav=()=>
  {
    if(showNav)
    setShowNav(false)
    else
    setShowNav(true);
  }
  return (
    <>
    <AdminNav setNav={setNav}/>
    <div className="admin">
     
      <div className="sideNav" style={showNav?slideRight:slideLeft}>
        {/*gotoMain && <Navigate to="/" replace />*/}
        <div>
          <img
            alt=""
            className="AdminProfile"
            src="images/avatar.png"
          />
        </div>
        <h3>Logeshwar</h3>
        <div>
          <hr />
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 1 && "var(--shadow)",
              borderLeft: navNo === 1 && "4px solid var(--primary)",
            }}
            onClick={(e) => {
              setNavNo(1);
              setNav()
            }}
          >
            <img src="images/page.png" alt="" className="iconImage" />
            <span>create events</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 2 && "var(--shadow)",
              borderLeft: navNo === 2 && "4px solid var(--primary)",
            }}
            onClick={(e) => {
              setNavNo(2);
              setNav();
            }}
          >
            <img src="images/edit.png" alt="" className="iconImage" />
            <span>Modify events</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 3 && "var(--shadow)",
              borderLeft: navNo === 3 && "4px solid var(--primary)",
            }}
            onClick={(e) => {
              setNavNo(3);
              setNav();
            }}
          >
            <img src="images/edit.png" alt="" className="iconImage" />
            <span>Mange Halls</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 4 && "var(--shadow)",
              borderLeft: navNo === 4 && "4px solid var(--primary)",
            }}
            onClick={() =>{
              setNavNo(4);
              setNav();}
            }
          >
            <img src="images/users.png" alt="" className="iconImage" />
            <span>Users details</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 5 && "var(--shadow)",
              borderLeft: navNo === 5 && "4px solid var(--primary)",
            }}
            onClick={() => {setNavNo(5);
              setNav()
            }}
          >
            <img src="images/group.png" alt="" className="iconImage" />
            <span>Participations</span>
          </button>
        </div>
        <div>
          <button
            style={{
              boxShadow: navNo === 6 && "var(--shadow)",
              borderLeft: navNo === 6 && "4px solid var(--primary)",
            }}
            className="navBtns"
            onClick={() => 
              {setNavNo(6);
                setNav();}
            }
          >
            <img src="images/trash.png" alt="" className="iconImage" />
            <span>Delete events</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 7 && "var(--shadow)",
              borderLeft: navNo === 7 && "4px solid var(--primary)",
            }}
            onClick={() => {setNavNo(7);setNav()}}
          >
            <img src="images/file.png" alt="" className="iconImage" />
            <span>Close events</span>
          </button>
        </div>
      </div>
      <div className="adminRightNav">
        {navNo === 1 && <CreateEvent />}
         {navNo === 2 && (
          <ModifyEvents
             setNavNo={(no) => setNavNo(no)}
             setEditEventId={setEditEventId}
          />
        )} 
         {navNo === 3 && <ManageHalls toast={deleted}/>}
        {navNo === 4 && <Users toast={deleted}/>}
        {navNo === 5 && <Participation toast={deleted}/>}
           {navNo === 6 && <DeleteEvents toast={deleted}/>}
        {navNo === 7 && <ClosedEvents />}
         {navNo === 8 && <EditEvents eventId={editEventId} toast={notify} setNavNo={(no) => setNavNo(no)}/>}  
      </div>
      <ToastContainer />
    </div>
    </>
  );
}

export default Admin;