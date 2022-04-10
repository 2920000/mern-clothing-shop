import React, { useEffect, useState } from "react";
import {GrFormPrevious,GrFormNext} from 'react-icons/gr'
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { fetchByCollection} from "../../../features/collectionSlice";

function Pagination({ payload, collection, queryUrl, productsTotal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prePageNumber = Number(payload.query.page);
  const [active,setActive]=useState(prePageNumber)
  const [pageTotal, setPageTotal] = useState(Math.ceil(productsTotal / 9));

  useEffect(() => {
    productsTotal && setPageTotal(Math.ceil(productsTotal / 9));
  }, [pageTotal, productsTotal]);

  const handlePaginate = (pageNumber) => {
    const newQueryUrl = queryUrl.replace(
      `page=${prePageNumber}`,
      `page=${pageNumber}`
    );
    payload.query.page = pageNumber;
    if (newQueryUrl === queryUrl && pageNumber !== prePageNumber) {
      navigate({
        pathname: `/collection/${collection}`,
        search: `page=${pageNumber} ${!newQueryUrl ? "" : `&${newQueryUrl}`} `,
      });
    } else {
      navigate({
        pathname: `/collection/${collection}`,
        search: `${newQueryUrl}`,
      });
    }

    dispatch(fetchByCollection(payload));
    setActive(pageNumber)
  };

  const handlePreAndNextPage=(params)=>{
  const newPage=prePageNumber+params
   const newQueryUrl = queryUrl.replace(
      `page=${prePageNumber}`,
      `page=${newPage}`
    );
    payload.query.page = newPage;
    if (newQueryUrl === queryUrl) {
      navigate({
        pathname: `/collection/${collection}`,
        search: `page=${newPage} ${!newQueryUrl ? "" : `&${newQueryUrl}`} `,
      });
    } else {
      navigate({
        pathname: `/collection/${collection}`,
        search: `${newQueryUrl}`,
      });
    }

    dispatch(fetchByCollection(payload));
    setActive(newPage)
  }
  return (
    <div className="flex justify-between items-center w-full py-2.5 border-y border-light_grey">
      <span className="font-bold text-light_grey">
        {productsTotal} sản phẩm
      </span>
      
      <ul className="flex">
      {prePageNumber>1&&<span onClick={()=>{handlePreAndNextPage(-1)}} className="w-[50px] h-[50px] cursor-pointer flex justify-center items-center border border-pagination_color  "><GrFormPrevious className="text-3xl "/></span>}
        {pageTotal>1 &&
          Array(pageTotal)
            .fill()
            .map((e, index) => (
              <li
              key={index}
                onClick={() => {
                  handlePaginate(index + 1);
                }}
                className={`list-none cursor-pointer ${active==`${index+1}`&&'bg-black text-white'} w-[50px] h-[50px] font-bold border border-pagination_color  flex justify-center items-center`}
              >
                {index + 1}
              </li>
            ))}
           {prePageNumber<pageTotal&&<span onClick={()=>{handlePreAndNextPage(1)}} className="w-[50px] cursor-pointer h-[50px] flex justify-center items-center border border-pagination_color "><GrFormNext className="text-3xl"/></span>}
      </ul>
   
    </div>
  );
}

export default Pagination;
