import React, { useState } from 'react'
function AdminNav({setNav}) {
    
    return (
        <div className="navBar">
          <div className='navBarInside'>
        <div className='flex'>
        <button className='menuButton' onClick={()=>setNav()}><img src="https://up2date-9f3b1.web.app/images/list.png" alt=""/></button>
          <span className="logo">
            up<span className="logoMiddle">2</span>date
          </span>{" "}
          <span className="logoEvent">events</span>
        </div>
        <h3>Admin</h3>
        <div className="loginButtonHolder">
          <button className="loginButton">Sign out</button>
        </div>
        </div>
        </div>
    )
}

export default AdminNav