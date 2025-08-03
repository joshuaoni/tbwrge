import { AlertCircle, X } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface PaymentRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
}

export const PaymentRequiredModal = ({
  isOpen,
  onClose,
  featureName,
}: PaymentRequiredModalProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t("paymentRequiredModal.title")}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-3">
            {t("paymentRequiredModal.description", { featureName })}
          </p>
          <p className="text-sm text-gray-500">
            {t("paymentRequiredModal.upgradeNowDescription")}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t("paymentRequiredModal.cancel")}
          </button>
          <button
            onClick={() => {
              onClose();
              router.push("/dashboard/billing?screen=choose");
            }}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("paymentRequiredModal.upgradeNow")}
          </button>
        </div>
      </div>
    </div>
  );
};
