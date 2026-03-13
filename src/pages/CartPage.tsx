import MainLayout from "../components/layouts/MainLayout"
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { setAlertAC } from "../redux/alertSlice";
import { addToCart, decreaseQuantity, getMyCart, removeFromCart } from "../api/cart";
import { setCartAC } from "../redux/cartSlice";
import Loader from "../components/UI/Loader";
import type { ICartItem } from "../utils/interfaces";
import DeleteCartItemPopup from "../components/popups/DeleteProductPopup";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteCartItemPopupOpen, setIsDeleteCartItemPopupOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<ICartItem | null>(null);

  const { items: cartItems } = useAppSelector(state => state.cart);

  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = 80;

  const getCartItems = async () => {
    const response = await getMyCart();
    dispatch(setCartAC(response));
  }

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getCartItems();
    } catch (error) {
      dispatch(setAlertAC({ mode: 'error', text: 'Something went wrong. Cannot load data.' }));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const onDeleteCartItem = async (productId: number) => {
    try {
      await removeFromCart(productId);
      setSelectedCartItem(null);
      setIsDeleteCartItemPopupOpen(false);
      getCartItems();
      dispatch(setAlertAC({ mode: 'success', text: 'Product was deleted from your cart.' }));
    } catch (error) {
      dispatch(setAlertAC({ mode: 'error', text: 'Something went wrong. Cannot delete product from cart.' }));
    }
  }

  const onOpenDeleteProductPopup = (cartItem: ICartItem) => {
    setSelectedCartItem(cartItem);
    setIsDeleteCartItemPopupOpen(true);
  }

  const onAddProduct = async (productId: number) => {
    try {
      await addToCart({ productId, quantity: 1 });
      getCartItems();
    } catch (error: any) {
      dispatch(setAlertAC({ mode: 'error', text: error.message }));
    }
  }

  const onMinusProduct = async (cartItemId: number) => {
    try {
      await decreaseQuantity(cartItemId);
      getCartItems();
    } catch (error: any) {
      dispatch(setAlertAC({ mode: 'error', text: error.message }));
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Кошик</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Список товарів */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <img
                        src={item.product.imageUrl ?? ''}
                        alt={item.product.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.product.title}</h3>
                          <button
                            onClick={() => onOpenDeleteProductPopup(item)}
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">Розмір: {item.quantity}</p>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => onMinusProduct(item.id)}
                              className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <MinusIcon className="h-6 w-6" />
                            </button>
                            <span className="px-3 font-medium text-sm">{item.quantity}</span>
                            <button
                              onClick={() => onAddProduct(item.product.id)}
                              className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <PlusIcon className="h-6 w-6" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-900">{(item.product.price * item.quantity).toLocaleString()} ₴</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 mb-4">Ваш кошик порожній</p>
                    <button className="text-blue-600 font-semibold flex items-center justify-center mx-auto hover:underline">
                      <ArrowLeftIcon className="mr-2 w-6 h-6" /> Повернутися до покупок
                    </button>
                  </div>
                )}
              </div>

              {/* Підсумок замовлення */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Підсумок</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Товари ({cartItems.length})</span>
                      <span>{subtotal.toLocaleString()} ₴</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Доставка</span>
                      <span>{shipping} ₴</span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Разом</span>
                      <span>{(subtotal + (cartItems.length > 0 ? shipping : 0)).toLocaleString()} ₴</span>
                    </div>
                  </div>

                  <button
                    disabled={cartItems.length === 0}
                    className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Оформити замовлення
                  </button>

                  <p className="text-xs text-center text-gray-400 mt-4">
                    Податкові збори розраховуються при оформленні
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteCartItemPopup
        isVisible={isDeleteCartItemPopupOpen}
        onClose={() => setIsDeleteCartItemPopupOpen(false)}
        cartItem={selectedCartItem!}
        onDelete={onDeleteCartItem}
      />
    </MainLayout>
  )
}

export default CartPage
