import { motion } from "framer-motion";

interface FeedbackSupportAccordionProps {
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle: VoidFunction;
}

function FeedbackSupportAccordion({
  title,
  content,
  isOpen = false,
  onToggle,
}: FeedbackSupportAccordionProps) {
  return (
    <div className="rounded-md shadow-sm bg-[#F5F5F5] px-4 py-2">
      <button
        onClick={onToggle}
        className="w-full text-left py-2 bg-gray-100 font-medium"
      >
        {title}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="overflow-hidden py-2"
        >
          <p className="text-[#747474]">{content}</p>
        </motion.div>
      )}
    </div>
  );
}

export default FeedbackSupportAccordion;
