import React, { useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import CollectionHeader from "./CollectionHeader/CollectionHeader";
import { FiChevronUp } from "react-icons/fi";
import useEventListener from "../../hooks/useEventListener";
import FilterSidebar from "./CollectionBody/FilterSidebar";
import FilterProducts from "./CollectionBody/FilterProducts";
import SuggestedProducts from "./CollectionBody/SuggestedProducts";
function Collection() {
  window.scrollTo(0, 0);
  return (
    <div className="mx-4 mder:mx-10">
      <div className="pt-10 ">
        <CollectionHeader />
      </div>
      <div className="flex pb-10">
        <ErrorBoundary>
          <FilterSidebar />
          <FilterProducts />
        </ErrorBoundary>
      </div>
      <div>
        <SuggestedProducts/>
      </div>
      <BackToTop />
    </div>
  );
}

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  if (!show) {
    return <></>;
  }
  return (
    <div
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      className="fixed z-30 flex cursor-pointer items-center justify-center w-12 h-12 bg-black bottom-20 right-7"
    >
      <FiChevronUp className="text-white text-2xl" />
    </div>
  );
};
export default Collection;
