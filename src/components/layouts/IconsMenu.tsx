import {
  ArrowRightStartOnRectangleIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LogoutPopup from '../popups/LogoutPopup'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { removeProfileAC } from '../../redux/profileSlice'
import SearchDropdown from '../UI/SearchDropdown'

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
          <SearchDropdown ref={searchBoxRef} />
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
