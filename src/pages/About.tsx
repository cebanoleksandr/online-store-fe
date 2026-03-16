import {
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import MainLayout from '../components/layouts/MainLayout';

const About = () => {
  const stats = [
    { label: 'Років на ринку', value: '5+' },
    { label: 'Задоволених клієнтів', value: '50k+' },
    { label: 'Товарів у каталозі', value: '10k+' },
    { label: 'Кур’єрська доставка', value: '24/7' },
  ];

  const values = [
    {
      title: 'Якість понад усе',
      description: 'Ми ретельно відбираємо кожного постачальника, щоб ви отримували лише найкращі товари.',
      icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />,
    },
    {
      title: 'Швидка доставка',
      description: 'Ваш час — наш пріоритет. Відправляємо замовлення в день оформлення.',
      icon: <TruckIcon className="w-8 h-8 text-blue-600" />,
    },
    {
      title: 'Клієнтський сервіс',
      description: 'Наша підтримка завжди на зв’язку, щоб допомогти вам з вибором або вирішити питання.',
      icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gray-900 h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
            alt="Shop interior"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Ми змінюємо досвід <br className="hidden md:block" /> онлайн-шопінгу
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Наш магазин — це не просто товари, це турбота про ваш комфорт та стиль.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="text-white">
                  <p className="text-3xl md:text-5xl font-extrabold mb-1">{stat.value}</p>
                  <p className="text-blue-100 text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content & Image */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Наша історія почалася з ідеї зробити якісне доступним.
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                У 2021 році ми помітили, що ринку бракує магазинів, де сервіс відповідає якості товару. Ми зібрали команду ентузіастів, які вірять, що кожна покупка має приносити радість.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Сьогодні ми співпрацюємо з провідними брендами та маємо власну логістичну мережу, щоб гарантувати найнижчі ціни та найшвидшу доставку в країні.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5" />
                До каталогу
              </button>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600"
                alt="Team work"
                className="rounded-2xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=600"
                alt="Parcel"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Чому обирають нас</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-20 text-center px-4">
          <div className="max-w-3xl mx-auto bg-gray-900 rounded-[3rem] p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Приєднуйтесь до нашої спільноти</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Підписуйтесь на наші соцмережі та будьте в курсі нових надходжень та ексклюзивних знижок.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                Instagram
              </button>
              <button className="px-8 py-3 border border-gray-700 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
                Facebook
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;