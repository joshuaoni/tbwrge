import { useState, useEffect } from "react";
import { useUserStore } from "@/hooks/use-user-store";
import { useTranslation } from "react-i18next";
import { X, Sparkles, Star } from "lucide-react";
import { outfit } from "@/constants/app";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExploring: () => void;
  onLearnMore: () => void;
}

const WelcomeModal = ({
  isOpen,
  onClose,
  onStartExploring,
  onLearnMore,
}: WelcomeModalProps) => {
  const { t } = useTranslation();
  const { userData } = useUserStore();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after modal opens
      setTimeout(() => setShowAnimation(true), 100);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full relative overflow-hidden">
        {/* Celebration Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {showAnimation && (
            <>
              {/* <div className="absolute top-4 left-4 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="absolute top-8 right-8 animate-pulse">
                <Star className="w-5 h-5 text-blue-400" />
              </div>
              <div className="absolute bottom-8 left-8 animate-spin">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <div className="absolute bottom-4 right-4 animate-bounce">
                <Star className="w-6 h-6 text-green-400" />
              </div> */}
            </>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Celebration Emoji */}
          <div className="text-6xl mb-4 animate-bounce">🎉</div>

          {/* Title */}
          <h2
            className={`${outfit.className} text-2xl font-bold text-gray-900 mb-2`}
          >
            {t("dashboard.welcomeModal.title")}
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 text-lg">
            {t("dashboard.welcomeModal.subtitle")}
          </p>

          {/* Description */}
          <p className="text-gray-700 mb-8 text-sm leading-relaxed">
            {t("dashboard.welcomeModal.description")}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onStartExploring}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {t("dashboard.welcomeModal.startExploring")}
            </button>

            <button
              onClick={onLearnMore}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              {t("dashboard.welcomeModal.learnMore")}
            </button>
          </div>

          {/* Trial Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {t("dashboard.welcomeModal.freeTrial")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
