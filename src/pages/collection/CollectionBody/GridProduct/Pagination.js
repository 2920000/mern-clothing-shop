import React, { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchByCollection,
  productsCollectionSelector,
  productsNumberTotalSelector,
} from "../../../../features/collectionSlice";
import queryString from "query-string";

function Pagination() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collection } = useParams();

  const products = useSelector(productsCollectionSelector);
  const productsTotal = useSelector(productsNumberTotalSelector);

  const queryStr = useLocation().search;
  const queryObject = queryString.parse(queryStr);
  const productsLength = products?.length || 0;

  let page = queryObject.page || 1;

  const payload = {
    pathParams: {
      collection,
    },
    queryParams: {
      ...queryObject,
      page,
    },
  };
  const prePageNumber = Number(payload.queryParams.page);
  const [pageNumber, setPageNumber] = useState(prePageNumber);
  const [pageTotal, setPageTotal] = useState(Math.ceil(productsLength / 9));

  useEffect(() => {
    products && setPageTotal(Math.ceil(productsTotal / 9));
  }, [products, productsTotal]);

  const handlePaginate = (pageNumber) => {
    const newQueryUrl = queryStr.replace(
      `page=${prePageNumber}`,
      `page=${pageNumber}`
    );
    payload.queryParams.page = pageNumber;
    if (newQueryUrl === queryStr && pageNumber !== prePageNumber) {
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
    setPageNumber(pageNumber)
  };
  const handlePreAndNextPage = (pageNumber) => {
    const newPage=prePageNumber+pageNumber
    const newQueryUrl = queryStr.replace(
       `page=${prePageNumber}`,
       `page=${newPage}`
     );
     payload.queryParams.page = newPage;
     if (newQueryUrl === queryStr) {
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
     setPageNumber(newPage)
  };

  const paginationNumberProps = {
    pageTotal,
    handlePaginate,
    pageNumber,
  };
  const paginationPreProps = {
    prePageNumber,
    handlePreAndNextPage,
  };
  const paginationNextProps = {
    prePageNumber,
    pageTotal,
    handlePreAndNextPage,
  };

  return (
    <div className="flex justify-between items-center w-full py-2.5 border-y border-light_grey">
      <span className="font-bold text-light_grey">
        {productsLength} sản phẩm
      </span>

      <ul className="flex">
        <PaginationPre {...paginationPreProps} />
        <PaginationNumber {...paginationNumberProps} />
        <PaginationNext {...paginationNextProps} />
      </ul>
    </div>
  );
}

export default Pagination;

const PaginationPre = ({ prePageNumber, handlePreAndNextPage }) => {
  return (
    <>
      {prePageNumber > 1 && (
        <span
          onClick={() => {
            handlePreAndNextPage(-1);
          }}
          className="w-[50px] h-[50px] cursor-pointer flex justify-center items-center border border-pagination_color  "
        >
          <GrFormPrevious className="text-3xl " />
        </span>
      )}
    </>
  );
};
const PaginationNumber = ({ pageTotal, handlePaginate, pageNumber }) => {
  return (
    <>
      {pageTotal > 1 &&
        Array(pageTotal)
          .fill()
          .map((e, index) => (
            <li
              key={index}
              onClick={() => {
                handlePaginate(index + 1);
              }}
              className={`list-none cursor-pointer ${
                pageNumber == `${index + 1}` && "bg-black text-white"
              } w-[50px] h-[50px] font-bold border border-pagination_color  flex justify-center items-center`}
            >
              {index + 1}
            </li>
          ))}
    </>
  );
};
const PaginationNext = ({ prePageNumber, pageTotal, handlePreAndNextPage }) => {
  return (
    <>
      {prePageNumber < pageTotal && (
        <span
          onClick={() => {
            handlePreAndNextPage(1);
          }}
          className="w-[50px] cursor-pointer h-[50px] flex justify-center items-center border border-pagination_color "
        >
          <GrFormNext className="text-3xl" />
        </span>
      )}
    </>
  );
};
