import { Link } from "react-router-dom";
import { Warehouse, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10">
                <Warehouse className="w-6 h-6 text-cyan-400" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold">SCLAD-UCHET</span>
                <span className="text-sm text-slate-400">
                  Система складского учета
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400 max-w-sm">
              Веб-приложение для учета товаров на складе с автоматизацией
              поступлений и списаний, контролем остатков и хранением истории
              операций в единой административной панели.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              Контроль складских процессов
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-white">Навигация</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-white transition-colors"
                >
                  О системе
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition-colors"
                >
                  Вход в систему
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold text-white">
              Основные модули
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>Dashboard и аналитика</li>
              <li>Учет товаров</li>
              <li>Категории и поставщики</li>
              <li>Поступления и списания</li>
              <li>История операций</li>
              <li>Контроль минимального остатка</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold text-white">Контактные данные</h4>

            <div className="mt-5 space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Бишкек, Кыргызстан</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <span>info@sclad-uchet.kg</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <span>+996 509 788 080</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Система предназначена для автоматизации учета товарных остатков,
              операций поступления и списания, а также повышения точности
              складского контроля.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} SCLAD-UCHET. Все права защищены.</p>
          <p>Разработка веб-системы учета товаров на складе</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
