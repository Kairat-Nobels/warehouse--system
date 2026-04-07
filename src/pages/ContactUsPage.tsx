/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaWhatsapp } from "react-icons/fa";

import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { createReview } from "../redux/slices/reviewsSlice";
import { useAppDispatch } from "../hooks/hooks";

const ContactUsPage = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [isValid, setIsValid] = useState(false);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false);
      setPhone(input);
      return;
    }
    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
    setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
    setPhone(input);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const rew = {
      name: name,
      phone: phone,
      comment: comment
    }
    dispatch(createReview(rew));

    setName('');
    setPhone('');
    setComment('');
  }
  return (
    <div
      style={{
        backgroundImage: `url("/bg-blue.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen bg-[#AFE6FF] p-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl text-white md:text-6xl font-bold mb-4 animate-fade-in">
          Связаться с нами
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 animate-slide-in">
          Есть вопросы или отзывы? <br /> Мы будем рады услышать от вас!
          <br /> Свяжитесь с нами, используя информацию ниже.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <a href="https://wa.me/996505806606" target="_blank">
            <div className="px-12 py-6 rounded-xl bg-white text-black shadow-lg m-4 transform transition duration-500 hover:scale-105 animate-zoom-in">
              <FaWhatsapp className="text-4xl mx-auto" />
              <h2 className="text-2xl font-bold mb-2">WhatsApp</h2>
              <p>+996 505 806 606</p>
            </div>
          </a>
          <a href="tel:+996550789907" target="_blank">
            <div className="px-12 py-6 rounded-xl bg-white text-black shadow-lg m-4 transform transition duration-500 hover:scale-105 animate-zoom-in delay-200">
              <CiPhone className="text-4xl mx-auto" />

              <h2 className="text-2xl font-bold mb-2">Телефон</h2>
              <p>+996 550 789 907</p>
            </div>
          </a>
          <a href="https://go.2gis.com/LOzZG" target="_blank">
            <div className="px-12 py-6 rounded-xl bg-white text-black shadow-lg m-4 transform transition duration-500 hover:scale-105 animate-zoom-in delay-400">
              <CiLocationOn className="text-4xl mx-auto" />

              <h2 className="text-2xl font-bold mb-2">Адрес</h2>
              <p>Бишкек, Кыргызстан</p>
            </div>
          </a>
        </div>
        <div className="my-8">
          <h2 className="text-3xl text-white font-bold mb-4 animate-fade-in delay-600">
            Оставить отзыв
          </h2>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white text-black p-6 rounded-xl shadow-lg">
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Имя</label>
              <input
                value={name} onChange={e => setName(e.target.value)} required type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-medium mb-2">Телефон</label>
              <input
                type="tel"
                placeholder="777222333"
                id="phone"
                value={phone}
                onChange={handlePhoneNumberChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!isValid && phone.length > 0 && <p className='errorNum'>Неверный номер телефона</p>
              }
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Отзыв</label>
              <textarea value={comment} onChange={e => setComment(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button
              disabled={isValid ? false : true}
              type="submit"
              className="w-full bg-blue-500 text-white text-lg py-4 rounded-xl hover:bg-blue-600 transition duration-300"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
