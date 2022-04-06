import React from "react";
import Login from "./Login";
import {useParams} from 'react-router-dom'
import Register from "./Register";
function Account() {
  const {option}=useParams()
  
  return (
    <div className="border-b ">
      <div className="max-w-[1200px] m-auto">
        {option==='login'&&<Login />}
        {option==='register'&&<Register/>}
      </div>
    </div>
  );
}

export default Account;
