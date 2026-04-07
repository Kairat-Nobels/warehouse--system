/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { createBooking } from "../redux/slices/bookingsSlice";
import { updateRoom } from "../redux/slices/roomsSlice";
import PaymentModal from "../components/PaymentModal";
import { useAppDispatch } from "../hooks/hooks";
import {
  FaTicketAlt,
  FaUser,
  FaPhoneAlt,
  FaMoneyBillWave,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const BookingPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketsCount, setTicketsCount] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { rooms, isLoading, error } = useSelector(
    (state: any) => state.roomsReducer
  );

  const room = rooms?.find((room: any) => Number(room.id) === Number(id));
  const totalPrice = (room?.price || 0) * ticketsCount;
  const maxTickets = room ? Math.min(room.availableSeats, 10) : 0;
  const isSoldOut = room ? room.availableSeats <= 0 : false;

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !ticketsCount) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    if (!room) {
      alert("Мероприятие не найдено.");
      return;
    }

    if (!isValid) {
      alert("Введите корректный номер телефона.");
      return;
    }

    if (room.availableSeats <= 0) {
      alert("Билеты закончились.");
      return;
    }

    if (ticketsCount > room.availableSeats) {
      alert("Недостаточно доступных билетов.");
      return;
    }

    const bookingData = {
      event: room,
      eventId: room.id,
      eventName: room.name || "",
      name: name.trim(),
      phone,
      ticketsCount,
      status: "paid",
      amount: totalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(createBooking(bookingData)).unwrap();

      await dispatch(
        updateRoom({
          id: Number(room.id),
          updatedData: {
            availableSeats: room.availableSeats - ticketsCount,
          },
        })
      ).unwrap();

      setIsModalOpen(true);
      setName("");
      setPhone("");
      setTicketsCount(1);
      setIsValid(false);
    } catch (err) {
      console.error(err);
      alert("Не удалось оформить покупку билетов.");
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = event.target.value.replace(/\D/g, "");

    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false);
      setPhone(input);
      return;
    }

    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, "($1)-$2-$3");
    setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
    setPhone(input);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-lg text-gray-600">Загрузка страницы бронирования...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center py-10">Ошибка: {error}</p>;
  }

  if (!room) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg mb-4">Мероприятие не найдено.</p>
        <Link
          to="/events"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Вернуться к афише
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-500 mb-3">
            Оформление заказа
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Покупка билетов
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Заполните данные ниже, выберите количество билетов и подтвердите покупку.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <img
              src={room.img}
              alt={room.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {room.name}
              </h2>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3">
                  <FaTicketAlt className="text-pink-500" />
                  <p>
                    <span className="font-semibold">Категория:</span>{" "}
                    {room.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500" />
                  <p>
                    <span className="font-semibold">Место:</span>{" "}
                    {room.location}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-500" />
                  <p>
                    <span className="font-semibold">Дата:</span>{" "}
                    {room.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaUsers className="text-purple-500" />
                  <p>
                    <span className="font-semibold">Осталось билетов:</span>{" "}
                    {room.availableSeats}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-green-500" />
                  <p>
                    <span className="font-semibold">Цена билета:</span>{" "}
                    {room.price} сом
                  </p>
                </div>
              </div>

              <p className="mt-6 text-gray-600 leading-7">
                После подтверждения покупки количество доступных билетов будет
                автоматически обновлено.
              </p>

              {isSoldOut && (
                <p className="mt-4 text-red-500 font-semibold">
                  Билеты закончились
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Данные покупателя
            </h2>

            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-800 mb-2">
                  <FaUser className="text-blue-500" />
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-3 w-full text-lg outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Введите имя"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-medium text-gray-800 mb-2">
                  <FaPhoneAlt className="text-green-500" />
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneNumberChange}
                  className="border border-gray-200 rounded-xl px-4 py-3 w-full text-lg outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Введите номер"
                  required
                />
                {!isValid && phone.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">
                    Неверный номер телефона
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 font-medium text-gray-800 mb-2">
                  <FaTicketAlt className="text-pink-500" />
                  Количество билетов
                </label>
                <select
                  value={ticketsCount}
                  onChange={(e) => setTicketsCount(Number(e.target.value))}
                  disabled={isSoldOut}
                  className="border border-gray-200 rounded-xl px-4 py-3 w-full text-lg outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
                >
                  {maxTickets > 0 ? (
                    Array.from({ length: maxTickets }, (_, index) => index + 1).map(
                      (count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      )
                    )
                  ) : (
                    <option value={0}>Нет билетов</option>
                  )}
                </select>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Итог заказа
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium">Билетов:</span> {isSoldOut ? 0 : ticketsCount}
                  </p>
                  <p>
                    <span className="font-medium">Цена за 1 билет:</span>{" "}
                    {room.price} сом
                  </p>
                  <p className="text-xl font-bold text-gray-900 pt-2">
                    Общая стоимость: {isSoldOut ? 0 : totalPrice} сом
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={!name || !phone || !ticketsCount || !isValid || isSoldOut}
                onClick={handleSubmit}
                className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 shadow-lg"
              >
                Подтвердить покупку
              </button>

              <Link
                to={`/events/${room.id}`}
                className="block text-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                Назад к мероприятию
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default BookingPage;
