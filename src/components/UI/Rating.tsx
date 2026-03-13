import { StarIcon } from "@heroicons/react/16/solid";
import { forwardRef, type HTMLAttributes, type JSX, useEffect, useState } from "react";
import cn from "classnames";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  rating: number;
}

const Rating = forwardRef<HTMLDivElement, IProps>(({ rating, ...rest }, ref) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, index) => {
      return (
        <StarIcon
          key={index}
          className={cn("inline-block size-5 transition duration-300", {
            "text-yellow-500": index < currentRating,
            "text-gray-300": index >= currentRating,
          })}
        />
      );
    });
    setRatingArray(updatedArray);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div 
      {...rest} 
      ref={ref} 
      className={cn("flex flex-nowrap items-center", rest.className)}
    >
      {ratingArray.map((star, index) => (
        <span key={index} className="inline-flex">
          {star}
        </span>
      ))}
    </div>
  );
});

export default Rating;
