import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import queryString from "query-string";
function SortOption() {
  const { collection } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const boxOptionRef = useRef();
  const sortByWrapperRef = useRef();

  const searchUrl = window.location.search;
  const queryObject = queryString.parse(searchUrl);
  //  console.log(searchUrl)
  const url = new URLSearchParams(searchUrl);
  const filterOption = [
    {
      displayName: "Bán chạy nhất",
      value: "best-selling",
    },
    {
      displayName: "Sản phẩm mới nhất",
      value: "new-to-old",
    },
    {
      displayName: "Giá tăng dần",
      value: "asc-price",
    },
    {
      displayName: "Giá giảm dần",
      value: "desc-price",
    },
  ];

  useEffect(() => {
    const inputFilterElement = document.querySelector("#filter-input");
    window.addEventListener("mousedown", (event) => {
      const isContain = sortByWrapperRef.current.contains(event.target);
      if (!boxOptionRef.current) {
        return;
      }
      inputFilterElement.placeholder = `${
        isContain ? "Nhập để tìm" : "Sắp xếp theo"
      }`;
      boxOptionRef.current.style.maxHeight = `${isContain ? "1000px" : "0"}`;
    });
  });

  const handleFilter = (value, e) => {
    e.stopPropagation();
    const pathname = `/collection/${collection}`;
    url.set("sort", value);
    navigate({
      pathname,
      search: url.toString(),
    });
    document.querySelector(".filter-input").placeholder = "Sắp xếp theo";
  };
  return (
    <div>
      <div className={`flex justify-end w-full relative `}>
        <div ref={sortByWrapperRef} className=" relative max-w-[220px]  ">
          <input
            onChange={(e) => setInput(e.target.value)}
            id="filter-input"
            type="text"
            placeholder="Sắp xếp theo"
            className=" filter-input outline-none border border-[#efefef] placeholder:text-light_black text-sm cursor-pointer  h-[54px] pl-4"
          />
          <ul
            ref={boxOptionRef}
            id="filter-list"
            className={`absolute top-[calc(100%)] text-light_black overflow-hidden max-h-0 transition-all duration-300  shadow-lg text-sm z-30 w-full  bg-white text-left left-0`}
          >
            {filterOption
              .filter((option) => option.displayName.includes(input))
              .map((item, index) => (
                <li
                  onClick={(e) => {
                    handleFilter(item.value, e);
                  }}
                  className="list-none pl-4 py-2 cursor-pointer"
                  key={index}
                >
                  {item.displayName}
                </li>
              ))}
          </ul>
          <span className="absolute  right-3 top-1/2 translate-y-[-50%] ">
            <IoIosArrowDown />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SortOption;
