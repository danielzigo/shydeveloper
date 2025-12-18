import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import FocusLock from "react-focus-lock";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string; // Make imageSrc optional
  type?: string;
  children?: React.ReactNode;
  positionRelative?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  imageSrc,
  type,
  children,
  positionRelative = false,
}: ModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close modal when pressing the escape key
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  // Focus on the close button when the modal opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Function to handle clicking the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking the backdrop
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${
            positionRelative ? "absolute" : "fixed"
          } inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 ${
            positionRelative ? "overflow-y-auto" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick} // Clicking the backdrop closes the modal
        >
          <FocusLock>
            <motion.div
              className="relative w-fit h-fit flex flex-col items-center bg-white/10 p-8 rounded-xl"
              id="modal-content"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {type === "image" && imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Project Image"
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="contain"
                  className="bg-black rounded-xl"
                />
              ) : (
                children
              )}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-3 right-4 text-2xl flex items-center gap-1 text-accent 
                transition-all duration-300 ease-in-out hover:text-accent-hover focus:outline-none 
                focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-black p-2 rounded-lg"
                aria-label="Close modal"
              >
                <span className="text-base">Close</span>
                <AiOutlineClose className="text-2xl" />
              </button>
            </motion.div>
          </FocusLock>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
