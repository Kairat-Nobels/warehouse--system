import React from "react";
import { Dialog } from "@headlessui/react";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import payment from "../assets/images/payment.png";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <Dialog.Panel className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-5xl" />
        </div>

        {/* Title */}
        <Dialog.Title className="text-2xl md:text-3xl font-bold text-center mb-2">
          Заказ оформлен
        </Dialog.Title>

        <p className="text-center text-gray-600 mb-4">
          Для завершения покупки выполните оплату по реквизитам ниже
        </p>

        {/* Payment Image */}
        <img
          src={payment}
          alt="Реквизиты для оплаты"
          className="w-full max-w-[300px] mx-auto rounded-xl border mb-4"
        />

        <p className="text-center text-sm text-gray-600 mb-5">
          После оплаты отправьте чек в WhatsApp для подтверждения
        </p>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/996505806606"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-4 rounded-xl transition"
        >
          <FaWhatsapp className="text-2xl" />
          Отправить чек
        </a>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PaymentModal;
