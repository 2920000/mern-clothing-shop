import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  collectionSelector,
  isLoadSelector,
  fetchByCollection,
} from "../../features/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import Skeleton from "../skeleton/Skeleton";
function GridProducts() {
  const { collection } = useParams();
  const dispatch = useDispatch();
  const productsSelector = useSelector(collectionSelector);
  const isLoad = useSelector(isLoadSelector);

  const queryUrl = useLocation().search.slice(1);
  const queryObject = queryString.parse(queryUrl);
  const currentPageNumber = queryObject.page;

  let page = currentPageNumber || 1;

  const payload = {
    params: {
      collection
    },
    query: {
      ...queryObject,
      page,
    },
  };

  const paginationProps = {
    payload,
    collection,
    queryUrl,
    productsTotal: productsSelector.total,
  };

  useEffect(() => {
    dispatch(fetchByCollection(payload));
  }, [collection, queryUrl]);

  useEffect(() => {
    return () => {
      dispatch(fetchByCollection({}));
    };
  }, []);

  useEffect(()=>{
    gridTransition(productsSelector)
  })

  return (
    <div id="grid" className="flex translate-y-[-40px] opacity-0 transition-all duration-500 flex-wrap h-full justify-around lg:justify-start box-border w-full ">
      {!isLoad ? (
        <>
          {productsSelector.pageArray?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
          <Pagination {...paginationProps} />
        </>
      ) : (
        <Skeleton type="collection" number={6} />
      )}
    </div>
  );
}

export default GridProducts;

const gridTransition=(productsSelector)=>{
  const ele=document.querySelector('#grid')
  if(productsSelector.pageArray?.length>0){
    ele.style.transform='translateY(0)'
    ele.style.opacity='1'
  }
}