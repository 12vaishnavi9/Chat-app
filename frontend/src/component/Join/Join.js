import React,{useState} from "react";
import "./Join.css";
import { NavLink } from "react-router-dom";

let user; 

const Join=()=>{

    const sendUser=()=>{
        user=document.getElementById("joininput").value;
        document.getElementById("joininput").value="";
    }

    const [name,setName]=useState("");
    return(
        <>
            <div className="JoinPage">
            <div className="JoinContainer">
            <h1>ChatVerse</h1>
            <input onChange={(e)=>setName(e.target.value)} type="text" id="joininput" placeholder="Enter Your Name"/>
            {/* mtlb ki agr koi value nahi daali tb  bhi login kr rhe toh chat p na jaye */}
            <NavLink onClick={(e)=>!name?e.preventDefault():null} to="chat"><button onClick={sendUser} className="joinBtn">Login</button></NavLink>
            </div>
            </div>
        </>
    )
}

export default Join;
export {user};