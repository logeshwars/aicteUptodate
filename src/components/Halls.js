import React,{useState,useEffect} from 'react'
import "./Hall.css";
function Halls(hall) {
    console.log(hall.booked)
  return (
    <div className='halls'>
        <div>
        <h4>{hall.name}</h4>
        <h5>{hall.block} </h5>
        <h6>{hall.college}</h6>
        <span>
        {hall.location}
        </span>
        </div>
        <div>
            <span className='hallsList'>
                <span>NO</span><span>{hall.no}</span>
            </span>
            <span className='hallsList'>
                <span>Floor</span><span>{hall.floor}</span>
            </span>
            <span className='hallsList'><span>capcity</span><span>{hall.capcity}</span></span>
        </div>
        <div>
            
            <span>{hall.facility}</span>
            <button className='bookHall' onClick={()=>{
                hall.setBooked(hall.id)
            }
            }>
                {hall.booked===hall.id? "Booked":"Book Hall"}
        </button>
        </div>
       
    </div>
  )
}

export default Halls