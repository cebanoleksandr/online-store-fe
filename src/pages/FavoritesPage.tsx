import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout"
import type { IProduct } from "../utils/interfaces";
import { getMyFavorites } from "../api/favorites";
import { useAppDispatch } from "../redux/hooks";
import { setAlertAC } from "../redux/alertSlice";
import ProductList from "../components/business/products/ProductsList";

const FavoritesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);

  const dispatch = useAppDispatch();

  const getFavoriteProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getMyFavorites();
      setFavoriteProducts(response);
    } catch (error) {
      dispatch(setAlertAC({ mode: 'error', text: 'Something went wrong.' }));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  const handleLocalUpdate = (productId: number) => {
    setFavoriteProducts(currentProducts => 
      currentProducts.filter(p => 
        p.id !== productId
      )
    );
  };

  return (
    <MainLayout>
      <h1 className="mt-10 text-center text-2xl font-bold">Улюбленi товари</h1>
      <ProductList 
        products={favoriteProducts} 
        isLoading={isLoading} 
        onToggleFavorite={handleLocalUpdate}
      />
    </MainLayout>
  )
}

export default FavoritesPage;
