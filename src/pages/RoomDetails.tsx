/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaTicketAlt,
  FaTag,
} from "react-icons/fa";

const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { rooms, isLoading, error } = useSelector(
    (state: any) => state.roomsReducer
  );
  const room = rooms?.find((room: any) => Number(room.id) === Number(id));
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(LOTTIE_URL);
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error("Failed to load Lottie animation data:", err);
      }
    };

    fetchAnimationData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gradient-to-b from-pink-50 to-white">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: 220, height: 220 }}
          />
        ) : (
          <p className="text-lg text-gray-600">Загрузка мероприятия...</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500 text-lg">
        Ошибка при загрузке данных: {error}
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-16 text-gray-600 text-lg">
        Мероприятие не найдено.
      </div>
    );
  }

  const eventHighlights = [
    "Удобное онлайн-бронирование билетов",
    "Актуальная информация о событии",
    "Комфортная площадка для посетителей",
    "Электронное подтверждение заказа",
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="uppercase tracking-[0.3em] text-sm text-pink-500 mb-3">
              Карточка мероприятия
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {room.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <img
                  className="w-full h-[300px] md:h-[520px] object-cover"
                  src={room.img}
                  alt={room.name}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Информация о событии
                </h2>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <FaTag className="text-pink-500 mt-1" />
                    <p>
                      <span className="font-semibold">Категория:</span>{" "}
                      {room.category || "Мероприятие"}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-blue-500 mt-1" />
                    <p>
                      <span className="font-semibold">Дата и время:</span>{" "}
                      {room.date || "Уточняется"}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-red-500 mt-1" />
                    <p>
                      <span className="font-semibold">Место проведения:</span>{" "}
                      {room.location || "Бишкек"}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaUsers className="text-purple-500 mt-1" />
                    <p>
                      <span className="font-semibold">Всего мест:</span>{" "}
                      {room.totalSeats}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaTicketAlt className="text-indigo-500 mt-1" />
                    <p>
                      <span className="font-semibold">Осталось билетов:</span>{" "}
                      {room.availableSeats}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaMoneyBillWave className="text-green-500 mt-1" />
                    <p>
                      <span className="font-semibold">Цена билета:</span>{" "}
                      {room.price} сом
                    </p>
                  </div>
                </div>

                <Link to={`/book-event/${room.id}`} state={{ room }}>
                  <button className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl hover:opacity-90 transition-opacity duration-300 font-semibold shadow-lg">
                    Купить билет
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Описание мероприятия
              </h3>
              <p className="text-gray-600 leading-8 text-lg">
                {room.description ||
                  "Это культурное мероприятие предоставляет пользователям возможность посетить интересное событие, познакомиться с программой, насладиться атмосферой и заранее забронировать билеты через удобную веб-платформу."}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Преимущества посещения
              </h3>
              <ul className="space-y-3">
                {eventHighlights.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/events"
              className="inline-block px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
            >
              Назад к афише
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
