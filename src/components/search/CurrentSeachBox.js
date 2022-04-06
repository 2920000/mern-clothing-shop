import { getLocalStorage } from "../../helper/localStoragefunction";

const CurrentSearchBox = () => {
  const dataFromLocalStorage = getLocalStorage("currentSearch");

  return (
    <>
      <span className="font-medium text-[#a9a9a9] tracking-wider mb-3 px-3 block">
        Tìm kiếm gần đây
      </span>
      {dataFromLocalStorage.map((e, index) => (
        <li
          className="font-bold list-none px-3 text-light_grey py-1 text-sm cursor-pointer hover:bg-gray-300 "
          key={index}
        >
          {e}
        </li>
      ))}
    </>
  );
};

export default CurrentSearchBox;
