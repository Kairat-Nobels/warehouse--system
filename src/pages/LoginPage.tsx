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
    // если админ уже авторизован (в localStorage), сразу отправляем в админку
    if (localStorage.getItem("admin") === "true" || valid) {
      navigate("/admin");
    }
  }, [valid, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Что - то пошло не так");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизоваться</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="login"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={formData.login === "" || formData.password === ""}
            className={`w-full px-4 py-2 text-white rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
