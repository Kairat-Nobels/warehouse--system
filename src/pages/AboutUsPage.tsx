import {
  Warehouse,
  Package,
  Truck,
  ClipboardList,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const AboutUsPage = () => {
  const advantages = [
    {
      icon: <Package className="w-8 h-8 text-cyan-400" />,
      title: "Учет товаров",
      description:
        "Система позволяет хранить информацию о товарах, отслеживать количество, категории и минимальные остатки.",
    },
    {
      icon: <Truck className="w-8 h-8 text-emerald-400" />,
      title: "Поступления",
      description:
        "Регистрация поступлений с автоматическим увеличением остатков и привязкой к поставщикам.",
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-amber-400" />,
      title: "Списания",
      description:
        "Контроль списаний с указанием причин и автоматическим обновлением количества товаров.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-sky-400" />,
      title: "Аналитика",
      description:
        "Отображение статистики, истории операций и контроль складских процессов.",
    },
  ];

  return (
    <div className="bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 rounded-full text-cyan-300 text-sm mb-6">
            <Warehouse className="w-4 h-4" />
            О системе
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Система учета товаров на складе
          </h1>

          <p className="mt-6 text-slate-400 text-lg leading-8 max-w-3xl mx-auto">
            Веб-приложение разработано для автоматизации складского учета,
            включая управление товарами, регистрацию поступлений и списаний,
            а также контроль текущих остатков и истории операций.
          </p>
        </div>
      </section>

      {/* ЦЕЛЬ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Цель проекта</h2>
            <p className="text-slate-400 leading-8">
              Основной целью разработки является создание удобной и эффективной
              системы управления складскими процессами. Система позволяет
              автоматизировать учет товаров, минимизировать ошибки при
              обработке данных и обеспечить быстрый доступ к актуальной
              информации о состоянии склада.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Задачи системы</h2>
            <ul className="space-y-3 text-slate-400">
              <li>— учет товаров и категорий</li>
              <li>— управление поставщиками</li>
              <li>— регистрация поступлений</li>
              <li>— оформление списаний</li>
              <li>— хранение истории операций</li>
              <li>— контроль минимальных остатков</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ФУНКЦИОНАЛ */}
      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Основные возможности</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Система охватывает ключевые процессы складского учета и позволяет
              централизованно управлять данными.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {advantages.map((item, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ТЕХНОЛОГИИ */}
      <section className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Используемые технологии
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto leading-8">
            Веб-приложение разработано с использованием современных технологий
            фронтенда и инструментов для построения пользовательского интерфейса
            и работы с данными.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              React
            </span>
            <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              Redux Toolkit
            </span>
            <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              Tailwind CSS
            </span>
            <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              Mokky.dev API
            </span>
          </div>
        </div>
      </section>

      {/* ЗАКЛЮЧЕНИЕ */}
      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Автоматизация складского учета
          </h2>

          <p className="text-slate-400 mt-6 leading-8">
            Разработанная система позволяет упростить процессы учета товаров,
            повысить точность данных и обеспечить прозрачность всех операций,
            связанных с движением товаров на складе.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 px-4 py-2 rounded-xl text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            Контроль и надежность данных
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
