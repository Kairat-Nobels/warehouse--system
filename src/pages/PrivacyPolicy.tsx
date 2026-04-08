const sections = [
  {
    title: "1. Сбор информации",
    text: "В процессе использования системы могут собираться данные, необходимые для работы платформы и ведения складского учета.",
    items: [
      "Имя пользователя (администратора)",
      "Контактные данные (email)",
      "Информация о товарах, категориях и поставщиках",
      "Данные о поступлениях и списаниях товаров",
    ],
  },
  {
    title: "2. Использование информации",
    text: "Собранная информация используется исключительно для обеспечения корректной работы системы, учета товаров, анализа операций и улучшения функциональности платформы.",
  },
  {
    title: "3. Хранение данных",
    text: "Все данные хранятся в базе данных и используются только в рамках работы системы. Принимаются меры для защиты информации от несанкционированного доступа.",
  },
  {
    title: "4. Передача данных третьим лицам",
    text: "Персональные данные пользователей не передаются третьим лицам, за исключением случаев, предусмотренных законодательством.",
  },
  {
    title: "5. Файлы cookie",
    text: "Система может использовать cookie для улучшения пользовательского опыта. Пользователь может отключить cookie в настройках браузера.",
  },
  {
    title: "6. Контакты",
    text: "Если у вас есть вопросы по поводу политики конфиденциальности, вы можете связаться с нами через форму обратной связи.",
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            Юридическая информация
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            Политика конфиденциальности
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Настоящая политика конфиденциальности описывает, какие данные
            собираются и как они используются в системе учета товаров на складе
            «SCLAD-UCHET».
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-10 shadow-sm">
          <div className="space-y-10">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border-b border-slate-800 pb-8 last:border-b-0 last:pb-0"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {section.title}
                </h2>

                <p className="mt-4 text-base md:text-lg leading-8 text-slate-400">
                  {section.text}
                </p>

                {section.items && (
                  <ul className="mt-5 space-y-3 text-slate-300">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
            Используя систему, вы соглашаетесь с условиями данной политики
            конфиденциальности.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
