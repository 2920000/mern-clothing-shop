import React, { useLayoutEffect, useState } from "react";
import collectionApi from "../../api/collectionApi";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
function NewIn() {
  return (
    <div className="my-10 max-w-[1450px] m-auto ">
      <div className="mx-2">
        <NewInHeading />
      </div>
    </div>
  );
}

const NewInHeading = () => {
  const [productByCollection, setProductByCollection] = useState(null);
  const [collection, setCollection] = useState("mens-clothing");
  const newInList = [
    {
      heading: "Nam",
      collection: "mens-clothing",
    },
    {
      heading: "Nữ",
      collection: "womens-clothing",
    },
    {
      heading: "Phụ kiện",
      collection: "accessory",
    },
  ];
  useLayoutEffect(() => {
    const fetchByCollection = async () => {
      const response = await collectionApi.fetchByCollection({
        pathParams: {
          collection,
        },
        queryParams: {
          page: 1,
        },
      });
      setProductByCollection(response.pageArray);
    };
    fetchByCollection();
  }, [collection]);

  const handleChangeNewInSlider = async (collection) => {
    setCollection(collection);
  };

  if (!productByCollection) {
    return <></>;
  }
  return (
    <div className="text-center">
      <h3 className="font-semibold text-3xl tracking-wide">Mới về</h3>
      <div className="flex justify-center gap-4 mt-2 mb-10 font-semibold text-xl">
        {newInList.map((newInItem, index) => (
          <p
            key={index}
            onClick={() => {
              handleChangeNewInSlider(newInItem.collection);
            }}
            className={`cursor-pointer tracking-wide ${
              collection === newInItem.collection
                ? "text-black"
                : "text-[#a4a4a4]"
            }`}
          >
            {newInItem.heading}
          </p>
        ))}
      </div>
      <ProductsSlider
        slidesPerView={6}
        spaceBetween={8}
        products={productByCollection}
        cardInforCss="text-sm"
      />
    </div>
  );
};
export default NewIn;
