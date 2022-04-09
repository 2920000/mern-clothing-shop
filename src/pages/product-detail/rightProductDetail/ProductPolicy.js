import { AiFillQuestionCircle } from "react-icons/ai";
import { FaCentercode, FaShippingFast } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const ProductPolicy = () => {
    const shippingRules = [
      {
        title: "Miễn phí vận chuyển ",
        subTitle:
          "Giao hàng miễn phí với mức giá cố định cho các đơn hàng trên 499.000₫ Giao hàng dự kiến vào ngày 17/04/2022 - 22/04/2022.",
        icon: <FaShippingFast />,
      },
      {
        title: "Quy tắc COD",
        subTitle: "Tìm hiểu thêm",
        icon: <FaCentercode />,
      },
      {
        title: "Chính sách hoàn trản",
        subTitle: "Tìm hiểu thêm",
        icon: <IoShieldCheckmarkOutline />,
      },
    ];
    return (
      <ul className="w-full p-5 bg-[#f7f8fa] mt-7">
        {shippingRules.map((rule, index) => (
          <li
            style={index === 1 ? { padding: "15px 0" } : {}}
            key={index}
            className="flex list-none "
          >
            <div className="text-2xl mr-2 text-[#198055] mt-1">{rule.icon}</div>
            <div>
              <p className="flex items-center text-[13px] font-semibold">
                {rule.title}
                <AiFillQuestionCircle className="text-light_black ml-1" />
              </p>
              <span className="block text-light_black leading-[1.4] text-[11px]">
                {rule.subTitle}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  export default ProductPolicy