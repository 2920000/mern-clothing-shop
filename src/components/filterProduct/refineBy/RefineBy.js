import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import RefineItem from "./RefineItem";

const RefineBy = () => {
  const navigate = useNavigate();
  const { collection } = useParams();
  const queryUrl = useLocation().search?.slice(1);
  
  const arrayParams=getParamsArray()

  const allCheckBoxes = document.querySelectorAll("[type]");

  const filterOptionTitleProps = {
    allCheckBoxes,
    collection,
    navigate,
  };
 
  useEffect(() => {
    if (!queryUrl) {
      allCheckBoxes.forEach((e) => (e.checked = false));
    }
  }, [queryUrl]);
 
  return (
    <>
     {arrayParams.length > 0 && (
        <div className="pb-8 pt-[30px] border-b border-border_bottom_filter">
          <FilterOptionTitle {...filterOptionTitleProps} />
          <RefineGroup arrayParams={arrayParams} />
        </div>
      )}
    </>
  );
};

export default RefineBy;


const FilterOptionTitle = ({ allCheckBoxes, collection, navigate }) => {
  const hanldeDeleteAllChoices = () => {
    navigate(`/collection/${collection}`);
    allCheckBoxes.forEach((e) => (e.checked = false));
  };
  return (
    <div className="flex justify-between mb-5 ">
      <span className="font-bold text-sm">LỰA CHỌN</span>
      <span
        onClick={hanldeDeleteAllChoices}
        className="text-xs font-semibold text-light_grey cursor-pointer"
      >
        Xóa Tất Cả
      </span>
    </div>
  );
};

const RefineGroup = ({arrayParams}) => {
  const { collection } = useParams();
 
  return (
    <>
      {arrayParams.map((param) => {
          return (
            <li className="list-none">
              <RefineItem
                value={param[Object.keys(param)[0]]}
                keySelected={Object.keys(param)[0]}
                collection={collection}
                />
            </li>
          );
      })}
    </>
  );
};

const getParamsArray=()=>{
  let refineByArray = [];
  const searchUrl = new URLSearchParams(window.location.search);
  for (let pair of searchUrl.entries()) {
    if (pair[0] !== "sort"&& pair[0] !== "page") {
      refineByArray.push({[pair[0]]:pair[1]});
    }
  }
  return refineByArray
}