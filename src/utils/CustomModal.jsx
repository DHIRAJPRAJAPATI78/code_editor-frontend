import { motion, AnimatePresence } from "framer-motion";

const CustomModal = ({ isOpen, onClose, title, message, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl border ${
              type === "success"
                ? "border-green-500"
                : type === "error"
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                type === "success"
                  ? "text-green-600"
                  : type === "error"
                  ? "text-red-600"
                  : "text-gray-800"
              }`}
            >
              {title}
            </h2>
            <p className="text-gray-700">{message}</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className={`px-4 py-1.5 rounded-lg font-medium text-white ${
                  type === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : type === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
