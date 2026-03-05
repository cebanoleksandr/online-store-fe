const Navigation = () => {
  return (
    <nav className="hidden lg:flex gap-6">
      <a href="/about" className="hover:text-black transition-colors">Про нас</a>
      <a href="/reviews" className="hover:text-black transition-colors">Відгуки</a>
      <a href="/delivery-and-payment" className="hover:text-black transition-colors">Доставка та оплата</a>
      <a href="/exchange-and-return" className="hover:text-black transition-colors">Обмін та повернення</a>
      <a href="/blog" className="hover:text-black transition-colors">Блог</a>
    </nav>
  )
}

export default Navigation;