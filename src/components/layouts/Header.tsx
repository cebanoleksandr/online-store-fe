import { useState } from 'react';
import {
  ChevronDownIcon, 
  PhoneIcon 
} from '@heroicons/react/24/outline';
import IconsMenu from './IconsMenu';
import Filters from './Filters';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-10 w-full border-b border-gray-200 font-sans bg-white">
      {/* 1. Top Bar */}
      <div className="border-b border-gray-100 py-2 px-4 md:px-12 flex justify-between items-center text-[11px] uppercase tracking-wider text-gray-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-black transition-colors">
            <PhoneIcon className="w-3.5 h-3.5" />
            <span>+38 (012) 345 67 89</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">
            <span>UA</span>
            <ChevronDownIcon className="w-3 h-3" />
          </div>
        </div>
        <Navigation />
      </div>

      {/* 2. Main Header Section */}
      <div className="py-6 px-4 md:px-12 flex justify-between items-center">
        {/* Ліва частина (пуста для балансу або мобільного меню) */}
        <div className="flex-1 lg:hidden">
          {/* Тут може бути іконка мобільного меню Bars3Icon */}
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link to="/" className="text-3xl font-bold tracking-[0.2em] text-black">
            LOGO
          </Link>
        </div>

        <IconsMenu />
      </div>

      {/* 3. Navigation & Search Results */}
      <div className="relative border-t border-gray-50">
        <Filters 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          menuItems={['Новинки', 'Знижки', 'Одяг', 'Взуття', 'Аксесуари']} 
        />
      </div>
    </header>
  );
};

export default Header;
