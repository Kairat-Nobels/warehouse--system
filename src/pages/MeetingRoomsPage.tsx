/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector } from "react-redux";
import { Room } from "../redux/slices/roomsSlice";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const MeetingRoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeats, setFilterSeats] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [animationData, setAnimationData] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { rooms, isLoading, error } = useSelector(
    (state: any) => state.roomsReducer
  );

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterSeats(value ? Number(value) : null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const typedRooms: Room[] = Array.isArray(rooms) ? rooms : [];

  const uniqueCategories: string[] = Array.from(
    new Set(
      typedRooms
        .map((room) => room.category as string)
        .filter((cat: string) => cat.trim() !== "")
    )
  );

  const filteredRooms = [...(rooms || [])]
    .filter((room: Room) =>
      room?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    .filter((room: Room) =>
      filterSeats ? room.availableSeats >= filterSeats : true
    )
    .filter((room: Room) =>
      filterCategory ? room.category === filterCategory : true
    )
    .sort((a: Room, b: Room) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

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
          <p className="text-lg text-gray-600">Загрузка мероприятий...</p>
        )}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-sm text-pink-500 mb-3">
            Афиша мероприятий
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Выберите событие по интересам
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Находите концерты, выставки, спектакли, фестивали и другие культурные
            мероприятия с удобным поиском и фильтрацией.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-6 md:p-8 mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaFilter className="text-pink-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Поиск и фильтрация
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию мероприятия..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <select
              value={filterCategory}
              onChange={handleCategoryChange}
              className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Все категории</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filterSeats ?? ""}
              onChange={handleSeatsChange}
              className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Фильтр по оставшимся местам</option>
              <option value="10">10+ мест</option>
              <option value="50">50+ мест</option>
              <option value="100">100+ мест</option>
              <option value="500">500+ мест</option>
            </select>

            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="asc">Цена билета: по возрастанию</option>
              <option value="desc">Цена билета: по убыванию</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterSeats(null);
              setFilterCategory("");
              setSortOrder("asc");
            }}
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-300 shadow-md"
          >
            Очистить фильтры
          </button>
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Мероприятия не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить параметры поиска или сбросить фильтры.
            </p>
          </div>
        )}

        {filteredRooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRooms.map((room: Room) => (
              <div
                key={room.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="overflow-hidden relative">
                  <img
                    src={room.img}
                    alt={room.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-full text-gray-800 shadow">
                    {room.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                    {room.name}
                  </h3>

                  <div className="space-y-3 mb-5 text-gray-600">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-pink-500" />
                      {room.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      {room.date}
                    </p>

                    <p>
                      <span className="font-medium text-gray-800">
                        Осталось мест:
                      </span>{" "}
                      {room.availableSeats}
                    </p>

                    <p>
                      <span className="font-medium text-gray-800">
                        Цена билета:
                      </span>{" "}
                      {room.price} сом
                    </p>
                  </div>

                  <Link
                    to={`/events/${room.id}`}
                    state={{ room }}
                    className="inline-block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="font-bold text-center my-8 text-red-500">
            Что-то пошло не так при загрузке мероприятий.
          </p>
        )}
      </div>
    </section>
  );
};

export default MeetingRoomsPage;
