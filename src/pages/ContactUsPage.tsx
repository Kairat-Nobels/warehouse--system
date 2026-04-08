import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactUsPage = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Связаться с нами
          </h1>

          <p className="mt-6 text-slate-400 text-lg leading-8 max-w-2xl mx-auto">
            Если у вас есть вопросы по работе системы складского учета,
            предложения или замечания — вы можете связаться с нами удобным
            способом.
          </p>
        </div>
      </section>

      {/* CONTACT BLOCKS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
            <Phone className="w-8 h-8 mx-auto text-cyan-400" />
            <h3 className="mt-4 text-xl font-semibold">Телефон</h3>
            <p className="text-slate-400 mt-2">+996 509 788 080</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
            <Mail className="w-8 h-8 mx-auto text-emerald-400" />
            <h3 className="mt-4 text-xl font-semibold">Email</h3>
            <p className="text-slate-400 mt-2">info@sclad-uchet.kg</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
            <MapPin className="w-8 h-8 mx-auto text-amber-400" />
            <h3 className="mt-4 text-xl font-semibold">Адрес</h3>
            <p className="text-slate-400 mt-2">7 апреля 3Б, г. Бишкек, Кыргызстан</p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Обратная связь</h2>
            <p className="text-slate-400 mt-4">
              Вы можете отправить сообщение через форму ниже
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Сообщение отправлено (демо)");
            }}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm text-slate-400">Имя</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-400">Email</label>
              <input
                required
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-400">
                Сообщение
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 rounded-xl font-semibold transition"
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
