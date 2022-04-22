import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import Pagination from "./Pagination";
import {
  fetchByCollection,
  isLoadingSelector,
  productsCollectionSelector,
} from "../../../../features/collectionSlice";
import CollectionSkeleton from "../../../../components/skeleton/CollectionSkeleton";
import ProductsFlex from "../../../../components/ProductsFlex/ProductsFlex";
import { ProductCard } from "../../../../components";

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
    <div className="w-full">
      <ProductsFlex>
        {products?.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            className=" mb-5  w-[calc(50%-8px)] lg:w-[calc(33.33%-8px)] "
          />
        ))}
      </ProductsFlex>
      <Pagination />
    </div>
  );
}

export default FilterProducts;
