import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ className, number, onClick, flex='' }) => {
  return (
    <div className={`flex ${flex} mb-3 `}>
      {Array(5)
        .fill()
        .map((star, index) => (
          <div key={index} onClick={() => onClick(index)} className="relative">
            <AiOutlineStar
              className={`text-orange-400 ${className}`}
            />
            {index <= number && (
              <AiFillStar
                className={`absolute top-0  text-orange-400 ${className}`}
              />
            )}
          </div>
        ))}
    </div>
  );
};
export default StarRating;
