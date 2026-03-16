import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [role, setRole] = useState(localStorage.getItem('user-role'));

  useEffect(() => {
    const handleAuthUpdate = () => {
      setRole(localStorage.getItem('user-role'));
    };

    // Слухаємо нашу власну подію
    window.addEventListener('authChange', handleAuthUpdate);
    
    // Також слухаємо 'storage' (на випадок змін в інших вкладках)
    window.addEventListener('storage', handleAuthUpdate);

    return () => {
      window.removeEventListener('authChange', handleAuthUpdate);
      window.removeEventListener('storage', handleAuthUpdate);
    };
  }, []);

  return (
    <nav className="hidden lg:flex gap-6">
      <Link to="/about" className="hover:text-black transition-colors">Про нас</Link>
      <Link to="/reviews" className="hover:text-black transition-colors">Відгуки</Link>
      <Link to="/delivery-and-payment" className="hover:text-black transition-colors">Доставка та оплата</Link>
      <Link to="/exchange-and-return" className="hover:text-black transition-colors">Обмін та повернення</Link>
      <Link to="/blog" className="hover:text-black transition-colors">Блог</Link>
      {role === 'admin' && (
        <Link to="/admin" className="hover:text-black transition-colors">Адмiн панель</Link>
      )}
    </nav>
  )
}

export default Navigation;