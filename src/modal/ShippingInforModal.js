import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import { userSelector } from "../features/accountSlice";
import {Link} from 'react-router-dom'
import {  fetchShippingInfor, isUpdateShippingInforSelector, updateShippingInforToDatabase } from "../features/userSlice";
import validateForm from "../helper/validateForm";
function ShippingInforModal() {
  const dispatch=useDispatch()
  const [shippingInfor, setShippingInfor] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const user = useSelector(userSelector);
  const isUpdateShippingInfor = useSelector(isUpdateShippingInforSelector);
  const allowSubmit = !!(
    shippingInfor.fullName &&
    shippingInfor.phoneNumber &&
    shippingInfor.address
  );
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  }, []);
  useEffect(() => {
    validateForm("shippingInforForm");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const notAllowSubmitToDatabase = validateForm.validate();
    if (notAllowSubmitToDatabase) return;
    dispatch(updateShippingInforToDatabase({userId: user._id, ...shippingInfor}))
  };
  const handleOnchangeInput = (e) => {
    setShippingInfor({ ...shippingInfor, [e.target.name]: e.target.value });
  };
  return ReactDom.createPortal(
    <div className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 z-50 bg-[rgba(0,0,0,0.3)]">
      <div className="bg-white shadow-xl p-[30px] rounded-md">
        <span className="block text-xl mb-2">Địa chỉ mới</span>
        <p className="text-xs">Để đăt hàng, vui lòng thêm địa chỉ nhận hàng</p>
        <form id="shippingInforForm" className="mt-5">
          <div className="flex">
            <div className="flex flex-col">
              <input
                onChange={handleOnchangeInput}
                type="text"
                name="fullName"
                className="border-[2px] border-border_input  outline-none focus:border-black transition-all duration-150 rounded-sm  py-1.5 px-2 mr-5"
                placeholder="Họ và tên"
                rules="required"
              />
              <span className="error-message"></span>
            </div>
            <div className="flex flex-col">
              <input
                onChange={handleOnchangeInput}
                type="text"
                name="phoneNumber"
                className="border-[2px] border-border_input outline-none focus:border-black transition-all duration-150  rounded-sm py-1.5 px-2"
                placeholder="Số điện thoại"
                rules="required|phone"
              />
              <span className="error-message"></span>
            </div>
          </div>
          <div className="mt-5">
            <textarea
              onChange={handleOnchangeInput}
              name="address"
              className="border-[2px] border-black_light outline-none focus:border-black transition-all duration-150 resize-none w-full rounded-sm pt-3 pb-5 px-2 "
              placeholder="Địa chỉ cụ thể"
              rules="required"
            />
            <span className="error-message"></span>
          </div>
          <div className="flex items-center justify-end mt-5">
            <a href='/' className="flex items-center justify-center w-[140px] h-[40px] hover:opacity-60 mr-2 ">
              Trở về
            </a>
            <button
              disabled={!allowSubmit && true}
              onClick={handleSubmit}
              className={`w-[140px] ${
                allowSubmit
                  ? "cursor-pointer hover:opacity-80"
                  : "cursor-not-allowed opacity-30"
              } text-white h-[40px] bg-black  `}
            >
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
      {isUpdateShippingInfor&&<Loading/>}
    </div>,
    document.getElementById("modal")
  );
}

export default ShippingInforModal;
