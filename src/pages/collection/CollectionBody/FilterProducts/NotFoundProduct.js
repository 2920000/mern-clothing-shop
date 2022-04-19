import { RiEmotionSadLine } from "react-icons/ri";

function NotFoundProduct() {
  return (
    <div className="w-full h-[500px] flex justify-center items-center text-2xl border-l border-border_size_color  ">
      Không tìm thấy sản phẩm nào <RiEmotionSadLine />
    </div>
  );
}

export default NotFoundProduct;
