import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="text-center max-w-xl">

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-400">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
          Страница не найдена
        </h2>

        {/* TEXT */}
        <p className="text-slate-400 text-lg mt-4 leading-relaxed">
          Похоже, такой страницы не существует или она была перемещена.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            На главную
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-semibold transition"
          >
            Войти
          </Link>
        </div>

        {/* FOOTER TEXT */}
        <p className="text-xs text-slate-500 mt-8">
          SCLAD-UCHET • Система учета товаров
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
