import { useEffect, useState } from "react";
import MySlider from "../components/business/home/MySlider"
import MainLayout from "../components/layouts/MainLayout"
import Tabs, { Tab } from "../components/UI/Tabs";
import type { IProduct } from "../utils/interfaces";
import { useAppDispatch } from "../redux/hooks";
import { setAlertAC } from "../redux/alertSlice";
import { getProducts } from "../api/products";
import ProductList from "../components/business/products/ProductsList";
import { type IProductFilters } from "../utils/interfaces"

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Знижки');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    const filters: IProductFilters = {
      category: activeTab === 'Новинки' ? 'New items' : activeTab === 'Знижки' ? 'Discounts' : 'Top sellers'
    }

    const response = await getProducts(filters)
    setProducts(response)
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      await fetchProducts()
    } catch (error) {
      dispatch(setAlertAC({ mode: 'error', text: 'Something went wrong with fetching products' }))
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleLocalUpdate = (productId: number) => {
    setProducts(currentProducts => 
      currentProducts.map(p => 
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  return (
    <MainLayout>
      <MySlider />

      <div className="mt-5">
        <Tabs
          active={activeTab}
          setActive={setActiveTab}
          className="flex justify-center"
        >
          <Tab name='Новинки'>
            <ProductList 
              products={products} 
              isLoading={isLoading} 
              onToggleFavorite={handleLocalUpdate} 
            />
          </Tab>

          <Tab name='Знижки'>
            <ProductList 
              products={products} 
              isLoading={isLoading} 
              onToggleFavorite={handleLocalUpdate} 
            /> 
          </Tab>

          <Tab name='Топ продажу'>
            <ProductList 
              products={products} 
              isLoading={isLoading} 
              onToggleFavorite={handleLocalUpdate} 
            />
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default HomePage
