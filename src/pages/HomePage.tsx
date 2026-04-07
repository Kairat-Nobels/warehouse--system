import { Link } from "react-router-dom";
import { Database, Package, Truck, ClipboardList, BarChart3, ShieldCheck, ArrowRight, Boxes, ScanSearch, Warehouse } from "lucide-react";

const advantages = [
  {
    icon: <Package className="w-7 h-7" />,
    title: "Учет товаров",
    description:
      "Добавление, редактирование и хранение полной информации о товарах, категориях и текущих остатках на складе.",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Поступления",
    description:
      "Регистрация новых поступлений от поставщиков с автоматическим увеличением количества товаров на складе.",
  },
  {
    icon: <ClipboardList className="w-7 h-7" />,
    title: "Списания",
    description:
      "Оформление списаний с указанием причины, комментария и автоматическим уменьшением остатка товара.",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Аналитика и контроль",
    description:
      "Отслеживание истории операций, дефицитных позиций, ключевых показателей и движения товаров в системе.",
  },
];

const modules = [
  "Dashboard с основными показателями склада",
  "Управление товарами и категориями",
  "Учет поставщиков",
  "Автоматизация поступлений и списаний",
  "История операций с фильтрацией",
  "Контроль минимального остатка товаров",
];

const stats = [
  { value: "24/7", label: "доступ к данным склада" },
  { value: "100%", label: "контроль движения товаров" },
  { value: "1", label: "единая система учета" },
  { value: "0", label: "лишней ручной путаницы" },
];

const HomePage = () => {
  return (
    <div className="bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_left,rgba(34,197,94,0.10),transparent_24%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-cyan-500 blur-3xl" />
          <div className="absolute top-40 right-10 h-52 w-52 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-44 w-44 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 mb-6">
                <Warehouse className="w-4 h-4" />
                Веб-система складского учета
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Система учета товаров на складе с автоматизацией{" "}
                <span className="text-cyan-400">поступлений</span> и{" "}
                <span className="text-emerald-400">списаний</span>
              </h1>

              <p className="mt-6 text-slate-300 text-base sm:text-lg leading-8 max-w-2xl">
                Современное веб-приложение для контроля остатков, регистрации
                поступлений, оформления списаний, ведения истории операций и
                управления складскими данными в единой административной панели.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 font-semibold transition-all duration-300"
                >
                  Войти в систему
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about-us"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 hover:border-cyan-400 hover:bg-slate-900 px-6 py-3 font-medium text-white transition-all duration-300"
                >
                  О проекте
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {item.value}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-sm">
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Панель мониторинга склада</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Актуальные показатели и последние операции
                      </p>
                    </div>
                    <Database className="w-8 h-8 text-cyan-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                      <p className="text-sm text-slate-400">Всего товаров</p>
                      <h4 className="text-2xl font-bold mt-2">1 248</h4>
                    </div>
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                      <p className="text-sm text-slate-400">Поставщиков</p>
                      <h4 className="text-2xl font-bold mt-2">36</h4>
                    </div>
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                      <p className="text-sm text-slate-400">Поступлений</p>
                      <h4 className="text-2xl font-bold mt-2 text-emerald-400">+182</h4>
                    </div>
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                      <p className="text-sm text-slate-400">Списаний</p>
                      <h4 className="text-2xl font-bold mt-2 text-amber-400">47</h4>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Контроль минимального остатка</p>
                      <ScanSearch className="w-5 h-5 text-rose-400" />
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3">
                        <span className="text-slate-300">Принтерная бумага A4</span>
                        <span className="text-rose-400 font-semibold">Остаток: 6</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3">
                        <span className="text-slate-300">Маркер перманентный</span>
                        <span className="text-amber-400 font-semibold">Остаток: 11</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3">
                        <span className="text-slate-300">Картридж для принтера</span>
                        <span className="text-rose-400 font-semibold">Остаток: 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-4 hidden md:flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-emerald-300 backdrop-blur-md">
                <ShieldCheck className="w-5 h-5" />
                Автоматический пересчет остатков
              </div>

              <div className="absolute -bottom-5 -left-4 hidden md:flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-300 backdrop-blur-md">
                <Boxes className="w-5 h-5" />
                Единая система управления складом
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-cyan-400 font-medium mb-3">Основные возможности</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Функционал, необходимый для эффективного складского учета
            </h2>
            <p className="text-slate-400 mt-4 leading-8">
              Система охватывает основные бизнес-процессы склада и помогает
              сократить количество ручных операций при работе с товарными
              остатками.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mt-5">{item.title}</h3>
                <p className="text-slate-400 mt-3 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-emerald-400 font-medium mb-3">Структура системы</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Административная панель для управления складскими процессами
              </h2>
              <p className="text-slate-400 mt-4 leading-8">
                Проект включает удобную панель администратора, в которой можно
                управлять товарами, поставщиками, категориями, поступлениями,
                списаниями и историей всех операций.
              </p>

              <div className="mt-8 space-y-4">
                {modules.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4"
                  >
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <p className="text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
                  <Package className="w-10 h-10 text-cyan-400" />
                  <h3 className="text-xl font-semibold mt-4">Товары</h3>
                  <p className="text-slate-400 mt-2 leading-7">
                    Хранение данных о товарах, артикулах, количестве, цене и
                    минимальном остатке.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
                  <Truck className="w-10 h-10 text-emerald-400" />
                  <h3 className="text-xl font-semibold mt-4">Поставщики</h3>
                  <p className="text-slate-400 mt-2 leading-7">
                    Ведение базы поставщиков с контактами и связью с товарными
                    поступлениями.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
                  <ClipboardList className="w-10 h-10 text-amber-400" />
                  <h3 className="text-xl font-semibold mt-4">Операции</h3>
                  <p className="text-slate-400 mt-2 leading-7">
                    Регистрация поступлений и списаний с последующим обновлением
                    остатков.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
                  <BarChart3 className="w-10 h-10 text-sky-400" />
                  <h3 className="text-xl font-semibold mt-4">История</h3>
                  <p className="text-slate-400 mt-2 leading-7">
                    Просмотр всех операций по датам, типам и конкретным товарным
                    позициям.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-cyan-400 font-medium mb-3">Начало работы</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Управляйте складом быстрее, точнее и удобнее в одной системе
          </h2>
          <p className="text-slate-400 mt-5 text-base md:text-lg leading-8 max-w-3xl mx-auto">
            Веб-приложение помогает автоматизировать ключевые операции склада,
            повысить точность учета и сократить вероятность ошибок при
            поступлениях и списаниях товаров.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 font-semibold transition-all duration-300"
            >
              Перейти в админ-панель
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700 hover:border-white hover:bg-slate-800 px-6 py-3 font-medium transition-all duration-300"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
