import type { FC } from "react";
import type { IProduct } from "../../../utils/interfaces";
import { HeartIcon } from "@heroicons/react/24/outline";
import Rating from "../../UI/Rating";

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => (
  <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-hover hover:shadow-md">
    <div className="aspect-square w-full bg-gray-100">
      <img
        src={product.imageUrl ?? 'https://doiqgxrhp4iii.cloudfront.net/A52%20(1).jpg'}
        alt={product.title}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 truncate min-w-0">{product.title}</h3>
        <button className="p-1 hover:text-gray-500 transition-colors cursor-pointer shrink-0">
          <HeartIcon className="h-6 w-6 stroke-[1.5]" />
        </button>
      </div>
      
      <div className="flex items-center justify-between gap-3">
        <p className="text-lg text-[#545454] truncate min-w-0">
          {product.price} UAH {!!product.oldPrice && <span className="text-[#9A9A9A] line-through">{product.oldPrice} UAH</span>}
        </p>
        <Rating className="shrink-0" rating={product.rating} />
      </div>

      <button className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700">
        Купити
      </button>
    </div>
  </div>
);

export default ProductCard;
