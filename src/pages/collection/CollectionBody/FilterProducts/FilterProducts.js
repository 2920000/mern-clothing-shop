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
import CollectionSkeleton from "../../../../components/skeleton/CollectionSkeleton";
import ProductsFlex from "../../../../components/ProductsFlex/ProductsFlex";

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
    <ProductsFlex>
      {products?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
      <Pagination />
    </ProductsFlex>
  );
}

export default FilterProducts;
