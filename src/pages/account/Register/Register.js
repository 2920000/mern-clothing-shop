import {  useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createUser } from "../../../api/userApi";
import Loading from "../../../components/loading/Loading";
import { loadSelector, userSelector } from "../../../features/accountSlice";
import validateForm from "../../../helper/validateForm";
import RegisterForm from "./RegisterForm";

function Register() {
  const [success,setSuccess]=useState(false)
  const successBoxRef=useRef()
  const user = useSelector(userSelector);
  const load = useSelector(loadSelector);
  
  useEffect(()=>{
    const payload={
      userId:user?._id,
      username:user?.username
    }
    if(user?.register==='success'){
      createUser(payload)
      setSuccess(true)
      validateForm.clearValue()
    }
  },[user])

 
  return (
    <>
        <div className=" py-[50px] px-[30px]  ">
          <h3 className="text-3xl font-bold">Tạo tài khoản</h3>
          <div className="flex flex-col w-full lg:items-end">
            <RegisterForm />
            <div className="text-light_grey my-5">
              Đã có tài khoản? <Link to="/account/login">Đăng nhập</Link>{" "}
            </div>
          </div>
         
          {success&&<div className="absolute  bg-[rgba(0,0,0,0.4)] z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
        <div ref={successBoxRef}  className="absolute flex flex-col justify-center rounded-md items-center bg-white w-[220px] py-5 ">
        <div className="w-10 h-10 ml-1 mb-1 flex items-center justify-center rounded-full border-[2.5px] border-green-500" >
            <div className=" w-3 h-4 border-r-4 rounded-sm border-r-green-500  border-b-4 border-b-green-500 rotate-45 "></div>
        </div>
        Đăng ký thành công!
        <a href='/account/login' className="text-right text-sm mt-3 cursor-pointer  bg-green-600 text-white  py-1 px-2 rounded-sm hover:opacity-80 ">
           Đăng nhập
         </a>
        </div>
       
      </div>}
      {load&&<Loading/>}
        </div>
     
    </>
  );
}

export default Register;
