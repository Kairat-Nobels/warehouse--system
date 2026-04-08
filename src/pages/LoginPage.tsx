/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { loginAdmin } from "../redux/slices/adminSlice";
import { useAppDispatch } from "../hooks/hooks";

const LoginPage = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { valid } = useSelector((state: any) => state.adminReducer);

  useEffect(() => {
    if (localStorage.getItem("admin") || valid) {
      navigate("/admin");
    }
  }, [valid, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginAdmin(formData));

      if (loginAdmin.fulfilled.match(resultAction)) {
        toast.success("Вы вошли как администратор");
        navigate("/admin");
      } else {
        toast.error("Неверный логин или пароль");
      }
    } catch {
      toast.error("Что-то пошло не так");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">

        {/* TITLE */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Вход в систему
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Администрирование склада
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="login"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />

          <button
            type="submit"
            disabled={!formData.login || !formData.password}
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Войти
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Доступ только для администратора
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
