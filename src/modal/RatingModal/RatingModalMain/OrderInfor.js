import React from 'react'

const OrderInfor = ({ orderInfor }) => {
    return (
      <div className="flex mb-7 ">
        <img className="max-w-[50px] mr-3" src={orderInfor.image} alt="" />
        <div className="text-sm">
          <p>{orderInfor.title}</p>
          <span>Size: {orderInfor.size}</span>
        </div>
      </div>
    );
  };
  

export default OrderInfor