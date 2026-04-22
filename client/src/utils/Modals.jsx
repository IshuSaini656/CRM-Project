import React from "react";

const GlobalModal = ({ isOpen, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] px-4">
      <div className="bg-[#0f172a] text-white w-full max-w-sm rounded-xl p-6 shadow-2xl border border-gray-700">
        <h2 className="text-lg font-semibold text-center mb-4">Confirmation</h2>

        <p className="text-gray-300 text-center mb-6 text-sm md:text-base">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-sm"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition duration-200 shadow-lg text-sm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
