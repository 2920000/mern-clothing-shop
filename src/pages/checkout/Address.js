import { MdOutlinePlace } from "react-icons/md";
import { useSelector } from "react-redux";
import { shippingInforSelector } from "../../features/userSlice";

const Address = () => {
  const shippingInfor = useSelector(shippingInforSelector);
  if(!shippingInfor){
    return <>Bị lỗi</>
  }
  return (
    <div className=" bg-white my-3 pt-6 pb-5 px-2 md:px-8 gap-2">
      <div className="flex items-center text-xl mb-2">
        <MdOutlinePlace className="text-xl" /> Địa chỉ giao hàng
      </div>
      <div>
        <div className="inline-block font-bold  mr-4">
          <span className="mr-1">{shippingInfor?.fullName}</span>
          <span>
            {shippingInfor.phoneNumber && "(+84)"} {shippingInfor.phoneNumber}
          </span>
        </div>
        <span>{shippingInfor.address}</span>
      </div>
    </div>
  );
};
export default Address;
