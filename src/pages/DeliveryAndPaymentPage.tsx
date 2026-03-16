import {
  TruckIcon,
  CreditCardIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import MainLayout from '../components/layouts/MainLayout';

const DeliveryAndPaymentPage = () => {
  const deliveryMethods = [
    {
      title: 'Нова Пошта',
      description: 'У відділення або поштомат по всій Україні.',
      price: 'від 70 грн',
      time: '1-3 дні',
      icon: <TruckIcon className="w-6 h-6" />,
    },
    {
      title: 'Кур’єрська доставка',
      description: 'Доставка до дверей у зручний для вас час.',
      price: 'від 100 грн',
      time: '1-2 дні',
      icon: <MapPinIcon className="w-6 h-6" />,
    },
    {
      title: 'Самовивіз',
      description: 'З нашого магазину в Києві (вул. Прикладна, 42).',
      price: 'Безкоштовно',
      time: 'Сьогодні',
      icon: <ClockIcon className="w-6 h-6" />,
    },
  ];

  const paymentMethods = [
    {
      title: 'Оплата карткою',
      description: 'Visa, MasterCard через безпечну систему LiqPay.',
      icon: <CreditCardIcon className="w-6 h-6" />,
    },
    {
      title: 'Післяплата',
      description: 'Оплата при отриманні у відділенні (накладений платіж).',
      icon: <BanknotesIcon className="w-6 h-6" />,
    },
    {
      title: 'Безготівковий розрахунок',
      description: 'Для юридичних та фізичних осіб (рахунок-фактура).',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
    },
  ];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header */}
        <section className="bg-white border-b border-gray-200 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Доставка та оплата</h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Ми робимо все можливове, щоб ваше замовлення потрапило до вас якнайшвидше та найзручнішим способом.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 space-y-16">

          {/* Delivery Methods Grid */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TruckIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Способи доставки</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {deliveryMethods.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Methods Grid */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-600 p-2 rounded-lg">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Способи оплати</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {paymentMethods.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="bg-gray-50 p-3 rounded-xl text-gray-700">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Return Policy Info */}
          <section className="bg-gray-900 rounded-4xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 md:flex items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <ArrowPathIcon className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-xs font-bold">Гарантія та повернення</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Легке повернення протягом 14 днів</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Не підійшов розмір чи колір? Жодних проблем. Ви можете повернути або обміняти товар протягом 14 днів з моменту покупки за умови збереження товарного вигляду.
                </p>
              </div>
              <button className="mt-8 md:mt-0 whitespace-nowrap bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                Детальніше про обмін
              </button>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
          </section>

          {/* FAQ Style note */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
            <ClockIcon className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">Важливо знати:</p>
              <p>Замовлення, оформлені до 16:00, ми відправляємо в той же день. Після відправки ви отримаєте SMS або повідомлення у Viber/Telegram з номером накладної для відстеження.</p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default DeliveryAndPaymentPage;