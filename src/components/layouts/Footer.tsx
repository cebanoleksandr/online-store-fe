import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] py-12 px-6 md:px-16 font-sans text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Блок 1: Лого та Соцмережі */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">Logo</h2>
          <div className="flex items-center space-x-4">
            {/* Використовуємо прості іконки або заглушки у стилі Heroicons */}
            <div className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </div>
            <div className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <div className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.3a7.11 7.11 0 0 1-1.3-1.07v7.36c.1 4.79-4.72 8.67-9.44 7.7-2.57-.44-4.75-2.54-5.35-5.08-.74-3.12 1.25-6.47 4.38-7.19.45-.1.9-.15 1.36-.16V10.1c-3.1.46-4.68 3.74-3.22 6.44 1.1 2.03 3.84 2.7 5.61 1.43 1.15-.83 1.65-2.31 1.57-3.69l-.02-14.26Z"/></svg>
            </div>
          </div>
        </div>

        {/* Блок 2: Каталог */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.15em] mb-6 text-gray-400">Каталог</h3>
          <ul className="flex flex-col space-y-3">
            {['Menu', 'Menu', 'Menu', 'Menu', 'Menu'].map((item, index) => (
              <li key={index}>
                <a href="#" className="text-[#4a4a4a] hover:text-black font-medium transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Блок 3: Контакти з Heroicons */}
        <div className="flex flex-col space-y-8">
          <h3 className="text-sm font-black uppercase tracking-[0.15em] text-gray-400">Контакти</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <PhoneIcon className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Телефон</p>
                <a href="tel:+380110110101" className="text-[#1a1a1a] font-semibold hover:underline decoration-1">
                  +38 (011) 011 01 01
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email</p>
                <a href="mailto:jellys@jellys.ua" className="text-[#1a1a1a] font-semibold hover:underline decoration-1">
                  jellys@jellys.ua
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Адреса</p>
                <p className="text-[#1a1a1a] font-semibold leading-tight">
                  Kyiv. white bat street. 25
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
