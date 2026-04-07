import { FaTicketAlt, FaUsers, FaRegCalendarAlt, FaShieldAlt } from "react-icons/fa";

const AboutUsPage = () => {
  const advantages = [
    {
      id: 1,
      icon: <FaTicketAlt className="text-3xl text-pink-500" />,
      title: "Удобное бронирование",
      description:
        "Платформа позволяет быстро находить интересующие мероприятия, просматривать подробную информацию и оформлять бронирование билетов онлайн.",
    },
    {
      id: 2,
      icon: <FaRegCalendarAlt className="text-3xl text-blue-500" />,
      title: "Актуальная афиша",
      description:
        "Пользователи получают доступ к актуальному расписанию культурных событий, включая концерты, выставки, спектакли и фестивали.",
    },
    {
      id: 3,
      icon: <FaUsers className="text-3xl text-purple-500" />,
      title: "Ориентация на пользователей",
      description:
        "Интерфейс платформы разработан так, чтобы сделать поиск, выбор и оформление билетов максимально понятными и удобными.",
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-3xl text-green-500" />,
      title: "Безопасность данных",
      description:
        "Особое внимание уделяется защите пользовательских данных и надёжности работы системы бронирования.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url("/cloudy.svg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 md:py-36 text-center text-white">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-300 mb-4">
            О платформе
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Современная веб-платформа
            <br />
            для культурных мероприятий
          </h1>
          <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-8">
            Платформа создана для удобного поиска, просмотра, бронирования и
            условной оплаты билетов на культурные события. Она объединяет афишу,
            информацию о мероприятиях и инструменты управления бронированиями в
            едином цифровом пространстве.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-600 mb-3">
              Наша миссия
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Сделать культурные события доступнее
            </h2>
            <p className="text-gray-600 text-lg leading-8">
              Основная миссия платформы заключается в том, чтобы упростить
              взаимодействие пользователей с культурной средой. Сервис помогает
              быстро находить интересные мероприятия, знакомиться с их
              содержанием, выбирать удобную дату и оформлять бронирование без
              лишних сложностей.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 md:p-10 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-100 mb-3">
              Ценность проекта
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Удобство для зрителей и организаторов
            </h2>
            <p className="text-white/90 text-lg leading-8">
              Платформа ориентирована не только на посетителей мероприятий, но и
              на администрирование контента. Это позволяет эффективно управлять
              афишей, бронированиями, отзывами и данными о событиях через единую
              административную панель.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-600 mb-3">
            История проекта
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как появилась идея</h2>
          <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
            Идея разработки платформы возникла из необходимости создать удобный
            онлайн-сервис, который объединяет культурные события в одном месте.
            Пользователь получает возможность быстро найти нужное мероприятие,
            изучить подробную информацию, оформить бронирование и получить
            понятный цифровой сценарий взаимодействия с платформой.
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-600 mb-3">
            Преимущества
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Что делает платформу удобной
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {advantages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-7">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
