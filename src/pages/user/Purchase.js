import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import { useGetOrderedQuery } from "../../services/orderedApi";

function Purchase() {
  const user = useSelector(userSelector);
  let { data, isLoading, refetch,isError } = useGetOrderedQuery(user._id);
  useEffect(() => {
    refetch();
  }, []);
 
  if (isLoading) {
    return <></>;
  }
  if(isError){
    return<>Something wrong</>
  }
  // let newData=[...data]
  // newData=newData.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
  console.log(data)
  return (
    <div>
      {data.map((order) => (
        <div className="flex p-7 justify-between">
          <div className="flex">
            <div className="max-w-[100px]">
              <img className="w-full" src={order.image} alt="" />
            </div>
            <div className="flex flex-col ml-5">
              <span>{order.title}</span>
              <span>Size: {order.size}</span>
              <span>Số lượng: {order.amount}</span>
            </div>
          </div>
          <div className="">{order.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Purchase;
