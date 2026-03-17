import { useEffect, useState, useTransition, useOptimistic } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon, ArrowLeftIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { toggleFavorite } from "../api/favorites";
import { addToCart } from "../api/cart";
import { useAppDispatch } from "../redux/hooks";
import { setAlertAC } from "../redux/alertSlice";
import { addToCartAC } from "../redux/cartSlice";
import type { IProduct } from "../utils/interfaces";
import MainLayout from "../components/layouts/MainLayout";
import { getProductById } from "../api/products";
import Button from "../components/UI/Button";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [authToken] = useState(localStorage.getItem('online-store-token'));

  // Завантаження даних
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        dispatch(setAlertAC({ mode: 'error', text: 'Не вдалося завантажити товар' }));
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, dispatch, navigate]);

  // Оптимістичний лайк
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(
    product?.isFavorite ?? false,
    (_, newState: boolean) => newState
  );

  const handleToggleLike = async () => {
    if (!product || isPending || !authToken) return;

    startTransition(async () => {
      addOptimisticFavorite(!product.isFavorite);
      try {
        await toggleFavorite(product.id);
        setProduct({ ...product, isFavorite: !product.isFavorite });
      } catch (error) {
        dispatch(setAlertAC({ mode: 'error', text: 'Помилка оновлення обраного' }));
      }
    });
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const response = await addToCart({ productId: product.id, quantity: 1 });
      dispatch(addToCartAC(response));
      dispatch(setAlertAC({ mode: 'success', text: `${product.title} додано до кошика` }));
    } catch (error: any) {
      dispatch(setAlertAC({ mode: 'error', text: error.message }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-white pb-20 pt-10 px-4 md:px-8 lg:px-16">
        {/* Кнопка назад */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Назад до покупок</span>
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Галерея зображень */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
            <img
              src={product.imageUrl ?? 'https://via.placeholder.com/800x800'}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            {!!product.oldPrice && (
              <div className="absolute left-6 top-6 bg-red-500 px-4 py-1.5 text-sm font-bold text-white rounded-full shadow-lg">
                SALE
              </div>
            )}
          </div>

          {/* Інформація про товар */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
              {product.category}
            </div>

            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
              {!!authToken && (
                <button
                  onClick={handleToggleLike}
                  disabled={isPending}
                  className={`p-3 rounded-full border transition-all ${optimisticFavorite ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                    }`}
                >
                  {optimisticFavorite ? (
                    <HeartIconSolid className="h-7 w-7 text-red-600" />
                  ) : (
                    <HeartIcon className="h-7 w-7 text-gray-400" />
                  )}
                </button>
              )}
            </div>

            {/* Рейтинг */}
            <div className="mb-8 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  star <= product.rating ? (
                    <StarIconSolid key={star} className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon key={star} className="h-5 w-5 text-gray-200" />
                  )
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                ({product.rating}.0 рейтинг)
              </span>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-gray-900">
                  {product.price} UAH
                </span>
                {!!product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through decoration-red-400/50">
                    {product.oldPrice} UAH
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-green-600 font-medium">В наявності</p>
            </div>

            <div className="mb-10 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Опис товару</h3>
              <p className="leading-relaxed text-gray-600">
                {product.description || "Опис для цього товару поки що відсутній. Ми працюємо над його додаванням."}
              </p>
            </div>

            {/* Кнопка дії */}
            <div className="mt-auto flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-xl bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="text-lg font-bold uppercase">Додати у кошик</span>
              </Button>
            </div>

            {/* Додаткові фішки */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                Безкоштовна доставка від 2000 UAH
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                14 днів на повернення
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailsPage;