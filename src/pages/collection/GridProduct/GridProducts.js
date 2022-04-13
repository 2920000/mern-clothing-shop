import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { qs } from "../../../helper/handleDOM";
function GridProducts() {
  const dispatch = useDispatch();
  const { collection } = useParams();
  const products = useSelector(productsCollectionSelector);
  const isLoading = useSelector(isLoadingSelector);
  const queryStr = useLocation().search;
  const queryObject = queryString.parse(queryStr);
  let page = queryObject.page || 1;

  const gridRef = useRef();
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
  const [style, setStyle] = useState({});
  useEffect(
    function () {
      if (products.length === 0) {
        return;
      }
      setStyle({ transform: "translateY(0)", opacity: "1" });
      return () => {
        setStyle({});
      };
    },
    [products]
  );

  if (isLoading) {
    return <Skeleton type="collection" number={6} />;
  }
  return (
    <div
      style={style}
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
