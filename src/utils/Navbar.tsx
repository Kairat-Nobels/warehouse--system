import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Warehouse, LogIn } from "lucide-react";

const navLinks = [
  { label: "Главная", path: "/" },
  { label: "О системе", path: "/about-us" },
  { label: "Контакты", path: "/contact-us" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={handleCloseMenu}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-400/20">
            <Warehouse className="w-6 h-6 text-cyan-400" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-lg sm:text-xl">
              SCLAD-UCHET
            </span>
            <span className="text-slate-400 text-xs sm:text-sm">
              Система складского учета
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.path)
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 font-semibold transition-all duration-300"
          >
            <LogIn className="w-4 h-4" />
            Войти
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2 text-white hover:bg-slate-800 transition-colors"
          aria-label="Открыть меню"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleCloseMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive(link.path)
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={handleCloseMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Войти в систему
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
