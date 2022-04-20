import {
  addLocalStorage,
  convertToPrice,
  getLocalStorage,
} from "../../../helper";

const SearchItem = ({ product }) => {
  const handleSaveCurrentSearch = (slug) => {
    const currentSearchFromLocalStorage = getLocalStorage("currentSearch");
    const hasCurrentSearchFromLocalStorage = Boolean(
      currentSearchFromLocalStorage
    );

    if (hasCurrentSearchFromLocalStorage) {
      const filterCurrentSearch = currentSearchFromLocalStorage
        .filter((e) => e.slug !== slug)
        .splice(0, 2);
      addLocalStorage("currentSearch", [
        { title: product.title, slug: product.slug },
        ...filterCurrentSearch,
      ]);
    } else {
      addLocalStorage("currentSearch", [
        { title: product.title, slug: product.slug },
      ]);
    }
  };

  return (
    <li className="list-none">
      <a
        href={`/products/${product.slug}`}
        onClick={() => {
          handleSaveCurrentSearch(product.slug);
        }}
        className="flex list-none py-2 mb-3"
      >
        <span>
          <img
            src={product.image}
            alt=""
            className="min-w-[56px] h-[74px] object-cover mr-3 "
          />
        </span>
        <div className="text-light_black ">
          <span className="font-semibold text-sm">{product.title}</span>
          <span className="block">{product.brand}</span>
          <span className="text-black text-sm">
            {convertToPrice(product.price)}
            <span className="ml-1">đ</span>
          </span>
        </div>
      </a>
    </li>
  );
};

export default SearchItem;
