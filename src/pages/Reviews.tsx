import { useState } from 'react';
import {
  StarIcon,
  HandThumbUpIcon,
  CheckBadgeIcon,
  PlusIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import MainLayout from '../components/layouts/MainLayout';

const Reviews = () => {
  const [filter, setFilter] = useState(0); // 0 - всі, 5 - тільки п'ятірки і т.д.

  const reviews = [
    {
      id: 1,
      author: 'Олександр Коваленко',
      date: '12 Березня, 2026',
      rating: 5,
      text: 'Дуже задоволений сервісом! Замовив кросівки, приїхали наступного дня. Якість на висоті, оригінал 100%. Буду замовляти ще.',
      verified: true,
      likes: 12
    },
    {
      id: 2,
      author: 'Марія Петренко',
      date: '10 Березня, 2026',
      rating: 4,
      text: 'Товар чудовий, але коробка була трохи пом’ята при транспортуванні. На якість самого виробу це не вплинуло, але на подарунок було б не дуже.',
      verified: true,
      likes: 5
    },
    {
      id: 3,
      author: 'Дмитро Іванов',
      date: '05 Березня, 2026',
      rating: 5,
      text: 'Найкращий магазин електроніки! Консультанти допомогли обрати ноутбук під мої завдання. Все працює ідеально.',
      verified: true,
      likes: 24
    }
  ];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Відгуки наших клієнтів</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Ми цінуємо кожного з вас. Ваші відгуки допомагають нам ставати кращими.
            </p>

            {/* Summary Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-gray-900">4.9</span>
                <div className="flex text-yellow-400 my-1">
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className="w-5 h-5" />)}
                </div>
                <span className="text-sm text-gray-400">На основі 1,240 відгуків</span>
              </div>
              <div className="hidden md:block h-16 w-px bg-gray-200"></div>
              <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all font-bold text-sm">
                <PlusIcon className="w-5 h-5" />
                Залишити відгук
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid md:grid-cols-4 gap-8">

          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Фільтрувати</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setFilter(stars)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${filter === stars ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stars}</span>
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-xs opacity-60">({stars * 12 + 5})</span>
                  </button>
                ))}
                <button
                  onClick={() => setFilter(0)}
                  className="w-full text-left text-sm text-blue-600 font-medium pt-2 underline"
                >
                  Скинути всі
                </button>
              </div>
            </div>
          </aside>

          {/* Reviews List */}
          <main className="col-span-1 md:col-span-3 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 transition-hover hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{review.author}</h4>
                        {review.verified && (
                          <div className="flex items-center text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                            <CheckBadgeIcon className="w-3 h-3 mr-1" />
                            Підтверджено
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      i < review.rating ? <StarIcon key={i} className="w-5 h-5" /> : <StarOutline key={i} className="w-5 h-5 text-gray-200" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  "{review.text}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition-colors">
                    <HandThumbUpIcon className="w-5 h-5" />
                    Корисно ({review.likes})
                  </button>
                  <button className="text-sm text-gray-400 hover:text-gray-600 underline">
                    Відповісти
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
              <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Завантажити ще
              </button>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reviews;