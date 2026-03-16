import {
  ArrowRightStartOnRectangleIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutPopup from '../popups/LogoutPopup'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { removeProfileAC } from '../../redux/profileSlice'

const IconsMenu = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('online-store-token'));

  const productsCount = useAppSelector(state => state.cart.items.length);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('online-store-token'));
    };

    window.addEventListener('authChange', handleAuth);
    window.addEventListener('storage', handleAuth);
    return () => {
      window.removeEventListener('authChange', handleAuth);
      window.removeEventListener('storage', handleAuth);
    };
  }, []);

  const count = useMemo(() => {
    return productsCount < 10 ? productsCount : '9+'
  }, [productsCount])

  // 👉 click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setShowSearchBox(false)
      }
    }

    if (showSearchBox) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearchBox])

  const onLogout = () => {
    localStorage.removeItem('online-store-token')
    localStorage.removeItem('user-role')
    dispatch(removeProfileAC())
    navigate('/login')
  }

  return (
    <div className="relative flex-1 flex justify-end items-center gap-4 md:gap-6 text-gray-800">
      {/* Search */}
      <button
        ref={buttonRef}
        onClick={() => setShowSearchBox((prev) => !prev)}
        className="p-1 hover:text-gray-500 transition-colors cursor-pointer"
      >
        <MagnifyingGlassIcon className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button className="p-1 hover:text-gray-500 transition-colors cursor-pointer" onClick={() => navigate('/favorites')}>
        <HeartIcon className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button
        className="p-1 hover:text-gray-500 transition-colors cursor-pointer"
        onClick={() => navigate('/profile')}
      >
        <UserIcon className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button
        className="p-1 hover:text-gray-500 transition-colors relative cursor-pointer"
        onClick={() => navigate('/cart')}
      >
        <ShoppingBagIcon className="w-6 h-6 stroke-[1.5]" />
        {!!productsCount && (
          <span className="absolute top-0 right-0 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </button>

      {isAuthenticated && (
        <button
          className="p-1 hover:text-gray-500 transition-colors cursor-pointer"
          onClick={() => setIsLogoutPopupVisible(true)}
        >
          <ArrowRightStartOnRectangleIcon className="w-6 h-6 stroke-[1.5]" />
        </button>
      )}

      {/* Search dropdown */}
      <AnimatePresence>
        {showSearchBox && (
          <motion.div
            ref={searchBoxRef}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1], // premium ease
            }}
            className="absolute right-12 top-10 mt-2 w-80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-60 p-5"
          >
            <div className="text-[10px] text-gray-400 uppercase mb-4 tracking-tighter">
              Результати пошуку
            </div>

            <div className="space-y-4 max-h-100 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-14 h-18 bg-gray-100 shrink-0">
                    <img
                      src="https://via.placeholder.com/56x72"
                      alt="product"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 border-b border-gray-50 pb-2">
                    <h4 className="text-[13px] font-medium leading-tight group-hover:underline">
                      Lorem ipsum dolor sit amet
                    </h4>
                    <p className="text-sm font-bold mt-1">1900 грн</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">
              Переглянути всі
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutPopup
        isVisible={isLogoutPopupVisible}
        onClose={() => setIsLogoutPopupVisible(false)}
        onLogout={onLogout}
      />
    </div>
  )
}

export default IconsMenu
