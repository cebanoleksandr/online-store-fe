import {
  ArrowPathIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import MainLayout from '../components/layouts/MainLayout';

const ExchangeAndReturnPage = () => {
  const steps = [
    {
      title: 'Зв’яжіться з нами',
      description: 'Зателефонуйте або напишіть нам у месенджери протягом 14 днів з моменту покупки.',
      icon: <PhoneIcon className="w-6 h-6" />,
    },
    {
      title: 'Заповніть заяву',
      description: 'Ми надішлемо вам бланк заяви на повернення, який потрібно додати до товару.',
      icon: <DocumentTextIcon className="w-6 h-6" />,
    },
    {
      title: 'Відправте товар',
      description: 'Надішліть товар "Новою Поштою" за реквізитами, які надасть менеджер.',
      icon: <ArrowPathIcon className="w-6 h-6" />,
    },
    {
      title: 'Отримайте кошти',
      description: 'Протягом 3-7 робочих днів після перевірки товару ми повернемо гроші на вашу картку.',
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
    },
  ];

  return (
    <MainLayout>
      <div className="bg-white min-h-screen pb-20">
        {/* Header */}
        <section className="bg-gray-50 border-b border-gray-200 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Обмін та повернення</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Ви маєте право повернути або обміняти товар протягом 14 днів, якщо він вам не підійшов. Ми зробили цей процес максимально простим.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
          {/* Important Conditions */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="bg-blue-50 p-8 md:p-12 rounded-4xl border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheckIcon className="w-7 h-7 text-blue-600" />
                Умови для повернення:
              </h2>
              <ul className="space-y-4">
                {[
                  'Товар не був у вживанні та не має слідів використання',
                  'Збережено товарний вигляд та всі споживчі властивості',
                  'Наявні всі пломби, ярлики та заводське маркування',
                  'Збережено оригінальну упаковку та повну комплектацію',
                  'Наявний документ, що підтверджує покупку (чек або ТТН)'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Важливо знати</h2>
              <p className="text-gray-600 leading-relaxed">
                Згідно із Законом України «Про захист прав споживачів», існують категорії товарів, які не підлягають обміну та поверненню (наприклад, засоби особистої гігієни, білизна, панчішно-шкарпеткові вироби).
              </p>
              <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-900 font-medium">
                  Вартість доставки при поверненні або обміні оплачується покупцем, крім випадків виявлення виробничого браку.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Guide */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Як зробити повернення?</h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Desktop Connector Line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 z-0"></div>

              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white border-4 border-gray-50 rounded-3xl shadow-sm flex items-center justify-center text-blue-600 mb-6 transition-transform hover:scale-105">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed px-4">{step.description}</p>
                  <div className="mt-4 text-xs font-black text-gray-200">КРОК 0{index + 1}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Залишилися питання?</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Наша служба підтримки працює щодня з 09:00 до 21:00. Ми допоможемо вирішити будь-яку ситуацію.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="tel:+38000000000" className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
                <PhoneIcon className="w-5 h-5" />
                0 800 33 44 55
              </a>
              <a href="mailto:support@store.com" className="flex items-center gap-3 border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors">
                <EnvelopeIcon className="w-5 h-5" />
                Написати нам
              </a>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExchangeAndReturnPage;