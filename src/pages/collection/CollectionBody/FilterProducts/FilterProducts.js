import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import {
  fetchByCollection,
  isLoadingSelector,
  productsCollectionSelector,
} from "../../../../features/collectionSlice";
import Skeleton from "../../../../components/skeleton/Skeleton";
import CollectionSkeleton from "../../../../components/skeleton/CollectionSkeleton";

function FilterProducts() {
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

  if (isLoading || !products) {
    return <CollectionSkeleton />;
  }

  return (
    <div className="flex gap-x-3 flex-wrap h-full justify-around lg:justify-start box-border w-full ">
      {products?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
      <Pagination />
    </div>
  );
}

export default FilterProducts;
