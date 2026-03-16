import { type FC, useOptimistic, useTransition, useState, useEffect } from "react";
import type { IProduct } from "../../../utils/interfaces";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Rating from "../../UI/Rating";
import Button from "../../UI/Button";
import { addToCart } from "../../../api/cart";
import { useAppDispatch } from "../../../redux/hooks";
import { setAlertAC } from "../../../redux/alertSlice";
import { toggleFavorite } from "../../../api/favorites";
import { addToCartAC } from "../../../redux/cartSlice";

interface IProps {
  product: IProduct;
  onToggleFavorite: (productId: number) => void;
}

const ProductCard: FC<IProps> = ({ product, onToggleFavorite }) => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  // 1. Стан для авторизації, який реагує на зміни в реальному часі
  const [authToken, setAuthToken] = useState(localStorage.getItem('online-store-token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthToken(localStorage.getItem('online-store-token'));
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const isAuth = !!authToken;

  // 2. Оптимістичне оновлення для "лайка"
  // Перший аргумент - реальний стан з пропсів, другий - функція оновлення
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(
    product.isFavorite,
    (state, currentState: boolean) => currentState
  );

  const onBuy = async () => {
    try {
      const response = await addToCart({ productId: product.id, quantity: 1 });
      dispatch(setAlertAC({ mode: 'success', text: `${product.title} додано до кошика` }));
      dispatch(addToCartAC(response))
    } catch (error: any) {
      dispatch(setAlertAC({ mode: 'error', text: error.message }));
    }
  };

  const toggleLike = async () => {
    if (isPending) return; // Захист від подвійних кліків

    startTransition(async () => {
      // Миттєво змінюємо UI
      addOptimisticFavorite(!product.isFavorite);
      
      try {
        await toggleFavorite(product.id);
        // Оновлюємо реальні дані з сервера (це синхронізує стан після завершення)
        onToggleFavorite(product.id);
      } catch (error: any) {
        dispatch(setAlertAC({ 
          mode: 'error', 
          text: 'Не вдалося оновити обране. Спробуйте пізніше.' 
        }));
        // При помилці useOptimistic автоматично поверне значення до product.isFavorite
      }
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Зображення товару */}
      <div className="aspect-square w-full bg-gray-100">
        <img
          src={product.imageUrl ?? 'https://doiqgxrhp4iii.cloudfront.net/A52%20(1).jpg'}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Заголовок та кнопка Обране */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 truncate min-w-0">
            {product.title}
          </h3>
          {isAuth && (
            <button 
              className={`p-1 transition-colors cursor-pointer shrink-0 outline-none ${
                isPending ? 'opacity-50 scale-95' : 'hover:scale-110'
              }`} 
              onClick={toggleLike}
              disabled={isPending}
            >
              {optimisticFavorite ? (
                <HeartIconSolid className="h-6 w-6 text-red-600 transition-transform" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-400 transition-transform" />
              )}
            </button>
          )}
        </div>

        {/* Ціна та Рейтинг */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-[#545454]">
              {product.price} UAH
            </p>
            {!!product.oldPrice && (
              <span className="text-sm text-[#9A9A9A] line-through">
                {product.oldPrice} UAH
              </span>
            )}
          </div>
          <Rating className="shrink-0" rating={product.rating} />
        </div>

        {/* Кнопка купити */}
        <Button
          className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          onClick={onBuy}
          mode="info"
        >
          Купити
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
