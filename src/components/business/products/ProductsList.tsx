import type { FC } from "react";
import type { IProduct } from "../../../utils/interfaces";
import ProductCard from "./ProductCard";
import Loader from "../../UI/Loader";

interface IProps {
  products: IProduct[];
  isLoading: boolean;
  onToggleFavorite: (productId: number) => void;
}

const ProductList: FC<IProps> = ({ products, isLoading, onToggleFavorite }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!products.length ? (
            <p className="text-gray-500 font-bold text-center text-3xl">There are no products.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onToggleFavorite={onToggleFavorite} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
