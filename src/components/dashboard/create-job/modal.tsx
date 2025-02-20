import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import toast from "react-hot-toast";

import { LiaTimesSolid as CloseIcon } from "react-icons/lia";

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

interface ModalProps {
  children: ReactNode;
  visibility: boolean;
  setVisibility: () => void;
  showCloseButton?: boolean;
}

export function CreateJobModal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (props.setVisibility) {
      props.setVisibility();
    } else {
      toast.error("Function not implemented");
    }
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {props.visibility && (
        <motion.div
          className="fixed z-20 w-full h-full left-0 top-0 py-4 px-3 md:px-6 bg-black/20 grid place-content-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOutsideClick}
          ref={modalRef}
        >
          <motion.div
            className="shadow-lg w-fit mx-auto relative bg-white rounded-lg"
            variants={modalVariants}
          >
            {props.children}

            {props.showCloseButton && (
              <button
                className="absolute top-2 right-2 p-2"
                onClick={handleClose}
              >
                <CloseIcon size={28} color="#898989" />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
