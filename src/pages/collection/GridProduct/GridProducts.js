import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchByCollection,
  isLoadingSelector,
  productsCollectionSelector,
} from "../../../features/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import Skeleton from "../../../components/skeleton/Skeleton";
function GridProducts() {
  const dispatch = useDispatch();
  const { collection } = useParams();
  const products = useSelector(productsCollectionSelector);
  const isLoading = useSelector(isLoadingSelector);
  const queryStr = useLocation().search;
  const queryObject = queryString.parse(queryStr);
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

  useEffect(() => {
    dispatch(fetchByCollection(payload));
  }, [collection, queryStr]);

  useEffect(() => {
    return () => {
      dispatch(fetchByCollection({}));
    };
  }, []);

  // xem lại
  const gridRef = useRef();
  useEffect(
    function () {
      const ref = gridRef.current;

      if (products.length === 0) {
        return;
      }
      ref.style.opacity = "1";
      ref.style.transform = "translateY(0)";
      return () => {};
    },
    [products, gridRef]
  );

  // if (isLoading) {
  //   return <Skeleton type="collection" number={6} />;
  // }
  return (
    <div
      ref={gridRef}
      className="flex translate-y-[-40px] opacity-0 transition-all duration-500 flex-wrap h-full justify-around lg:justify-start box-border w-full "
    >
      {products?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
      <Pagination />
    </div>
  );
}

export default GridProducts;
