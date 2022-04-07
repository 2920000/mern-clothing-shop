import React from "react";

function Skeleton({ number, type }) {
  if (type === "search") {
    return (
      <>
        {Array(number)
          .fill()
          .map((e) => (
            <div className="flex items-center mb-2 animate-skeleton">
              <div className="w-12 h-12 bg-skeleton_color "></div>
              <div className="w-full ml-2">
                <div className="w-full h-2 bg-skeleton_color"></div>
                <div className="w-[60%] h-2 bg-skeleton_color mt-2"></div>
              </div>
            </div>
          ))}
      </>
    );
  }
  if(type==='productDetail'){
    return<>
      
    </>

  }
  return (
    <>
      {type === "collection" && (
        <div className="flex flex-wrap w-full mx-[-5px]">
          {Array(number)
            .fill()
            .map((e, index) => (
              <div
                key={index}
                className="mx-[5px] mb-5 w-[calc(33.33%-20px)] bg-skeleton_color pt-[40%] animate-skeleton"
              ></div>
            ))}
          {type === "filter" && (
            <div>
              {Array(number)
                .fill()
                .map((e, index) => (
                  <div></div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Skeleton;
