import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { useAppDispatch } from "../hooks/hooks";
import { createFeedback } from "../redux/slices/feedbackSlice";

const ContactUsPage = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(createFeedback(formData));

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Контактная информация
          </h1>

          <p className="mt-6 text-slate-600 text-lg leading-8 max-w-2xl mx-auto">
            Если у вас возникли вопросы по работе системы мониторинга складских
            запасов, вы можете связаться с нами или отправить сообщение через
            форму обратной связи.
          </p>
        </div>
      </section>

      {/* CONTACT BLOCKS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
            <Phone className="w-8 h-8 mx-auto text-cyan-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Телефон
            </h3>
            <p className="text-slate-500 mt-2">
              +996 500 123 456
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
            <Mail className="w-8 h-8 mx-auto text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Email
            </h3>
            <p className="text-slate-500 mt-2">
              support@stockvision.kg
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
            <MapPin className="w-8 h-8 mx-auto text-orange-500" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Адрес
            </h3>
            <p className="text-slate-500 mt-2">
              г. Бишкек, Кыргызстан
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Форма обратной связи
            </h2>

            <p className="text-slate-500 mt-4">
              Отправьте сообщение администрации системы
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm"
          >

            <div>
              <label className="block mb-2 text-sm text-slate-600">
                Имя
              </label>

              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-600">
                Email
              </label>

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-600">
                Сообщение
              </label>

              <textarea
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition"
            >
              <MessageCircle className="w-4 h-4" />
              Отправить сообщение
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
