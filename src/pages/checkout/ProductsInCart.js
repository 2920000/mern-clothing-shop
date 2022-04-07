import { convertToPrice } from "../../helper/converToPrice";

function ProductsInCart({cartProduct}) {

  return (
    <div className="w-full bg-white py-10 px-8">
      <div className="flex font-medium mb-5">
        <h3 className="w-[60%] text-lg">Sản phẩm</h3>
        <div className="flex w-[40%] text-sm text-light_grey">
          <span className="w-[30%] text-center">Đơn giá</span>
          <span className="w-[30%] text-center">Số lượng</span>
          <span className="flex justify-end grow whitespace-nowrap">Thành tiền</span>
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

export default ProductsInCart;

const OrderItem = ({ order }) => {
  return (
    <li className="flex items-center mb-10">
      <div className="w-[60%] flex items-center">
        <img className="w-[60px] h-[60px] object-cover object-top mr-2" src={order.image} alt="" />
        <span className="block w-[300px] text-sm">{order.title}</span>
        <span className="ml-10 text-light_grey">Size: {order.size}</span>
      </div>
      <div className="w-[40%] flex">
        {" "}
        <span className="text-sm w-[30%] text-center font-medium">
          {convertToPrice(order.price)} đ
        </span>
        <span className="inline-block w-[30%] text-center">
          {order.amount}
        </span>
        <span className="flex justify-end grow text-sm font-medium ">
          {convertToPrice(order.price * order.amount)} đ
        </span>
      </div>
    </li>
  );
};
