import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import { caculateSale } from "../../helper/caculateSale";
import { convertToPrice } from "../../helper/converToPrice";
import { moneyTotal } from "../../helper/moneyTotal";
import { useGetOrderedQuery } from "../../services/orderedApi";

function Purchase() {
  const user = useSelector(userSelector);
  let { data, isLoading, refetch, isError } = useGetOrderedQuery(user._id);

  useEffect(() => {
    refetch();
  }, []);

  let newData = [];
  data &&
    data.forEach((product) => {
      if (newData.length === 0) {
        newData.push([product]);
        return;
      }

      for (let arrayProducts of newData) {
        const isOrderSameTime = arrayProducts.some(
          (p) => p.date === product.date
        );
        if (isOrderSameTime) {
          arrayProducts.push(product);
          return;
        } else {
          newData.push([product]);
          return;
        }
      }
    });
  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>Something wrong</>;
  }

  // let newData=[...data]
  // newData=newData.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
  return (
    <div>
      {newData.map((productsSameTime) => (
        <div className="bg-white  mb-4 p-2 md:p-7">
          {productsSameTime.map((order) => (
            <div className="flex relative justify-between items-center py-3 border-y border-border ">
              <div className="flex">
                <div className="max-w-[80px] flex px-2 border border-border">
                  <img className="w-full" src={order.image} alt="" />
                </div>
                <div className="flex text-sm md:text-base flex-col ml-5">
                  <span className="">{order.title}</span>
                  <span className="text-sm">Size: {order.size}</span>
                  <span className="text-sm">Số lượng: {order.amount}</span>
                </div>
              </div>
              <div className=" absolute right-0 bottom-0 md:relative text-sm whitespace-nowrap ">
                <span
                  className={
                    order.sale > 0 &&
                    "line-through text-light_grey inline-block mr-2"
                  }
                >
                  {convertToPrice(order.price)}đ
                </span>
                <span className="">
                  {order.sale > 0 &&
                    convertToPrice(caculateSale(order) / order.amount) + "đ"}
                </span>
              </div>
            </div>
          ))}
          <div>
            <div className="text-right my-3 md:my-6 flex items-center justify-end ">
              <p className=" inline text-sm mr-2">Tổng số tiền:</p>
              <span className=" text-sm md:text-xl lg:text-2xl">
                {convertToPrice(moneyTotal(productsSameTime))}đ
              </span>
            </div>
          </div>
          <p className="text-xs">
            Đơn hàng sẽ được chuẩn bị và chuyển đi trước
            <span className="ml-2 underline">{formatDate(productsSameTime[0].date)}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Purchase;

const formatDate = (date) => {
  let newDate = date.slice(0, 10);
  let dateNumberArray = newDate.split("-");
  let day=Number(dateNumberArray[1])+3
  let month=dateNumberArray[2]
  let year=dateNumberArray[0]

  return `${day}-${month}-${year}`;
};
