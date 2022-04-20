import { calculateSale, convertToPrice } from "../../helper";

function OrderSummary({ cartProduct }) {
  return (
    <div className="w-full bg-white py-5 mder:py-10 px-2   md:px-8">
      <div className="hidden mder:flex font-medium mb-5">
        <h3 className="w-[60%] text-lg">Sản phẩm</h3>
        <div className="flex w-[40%] text-sm text-light_grey">
          <span className="w-[30%] text-center">Đơn giá</span>
          <span className="w-[30%] text-center">Số lượng</span>
          <span className="flex justify-end grow whitespace-nowrap">
            Thành tiền
          </span>
        </div>
      </div>
      <ul>
        {cartProduct?.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default OrderSummary;

const OrderItem = ({ order }) => {
  return (
    <li className="flex items-center mb-2 mder:mb-10">
      <div className="w-[60%] flex items-center">
        <img
          className="w-[60px] h-[60px] object-cover object-top mr-2"
          src={order.image}
          alt=""
        />
        <div className="flex flex-col mder:block">
          <span className="min-w-[150px] text-sm lg:text-base">
            {order.title}
          </span>
          <span className="mder:ml-10 text-light_grey">Size: {order.size}</span>
        </div>
      </div>
      <div className="w-[40%] flex">
        <div className="text-sm w-full mder:w-[30%] text-center font-medium">
          <span>{convertToPrice(calculateSale(order) / order.amount)} đ</span>
        </div>
        <span className="inline-block w-[30%] text-center">{order.amount}</span>
        <span className="hidden mder:flex justify-end grow text-sm font-medium ">
          {convertToPrice(calculateSale(order))} đ
        </span>
      </div>
    </li>
  );
};
