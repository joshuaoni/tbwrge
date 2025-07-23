import { Button } from "@/components/ui/button";
import { BillingContext } from "@/providers/billing.context";
import { outfit } from "@/constants/app";
import { ArrowLeft } from "lucide-react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import {
  submitEnterpriseRequest,
  EnterpriseRequestPayload,
} from "@/actions/enterprise";
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";

function BillingEnterpriseForm() {
  const ctx = useContext(BillingContext);
  const { t } = useTranslation();
  const { userData } = useUserStore();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phoneNumber: "",
    hiringNeeds: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEnterpriseMutation = useMutation({
    mutationFn: async (payload: EnterpriseRequestPayload) => {
      if (!userData?.token) throw new Error("No token available");
      return await submitEnterpriseRequest(userData.token, payload);
    },
    onSuccess: () => {
      toast.success(t("enterprisePlan.messages.success"));
      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        workEmail: "",
        phoneNumber: "",
        hiringNeeds: "",
      });
      // Go back to billing plans
      ctx.goTo("choose");
    },
    onError: (error) => {
      console.error("Error submitting enterprise request:", error);
      toast.error(t("enterprisePlan.messages.error"));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: EnterpriseRequestPayload = {
      name: formData.fullName,
      company: formData.companyName,
      email: formData.workEmail,
      phone: formData.phoneNumber,
      details: formData.hiringNeeds,
    };

    submitEnterpriseMutation.mutate(payload);
  };

  return (
    <div className={`${outfit.className} space-y-6`}>
      <button
        onClick={() => ctx.goTo("choose")}
        className="hover:bg-gray-100 p-1 rounded-full transition-colors flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold">
          {t("enterprisePlan.backToPlans")}
        </span>
      </button>

      <div className="max-w-2xl">
        <h1 className="text-sm font-semibold mb-2">
          {t("enterprisePlan.title")}
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          {t("enterprisePlan.description")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("enterprisePlan.form.fullName.label")}{" "}
              <span className="text-red-500">
                {t("enterprisePlan.form.required")}
              </span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={t("enterprisePlan.form.fullName.placeholder")}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("enterprisePlan.form.companyName.label")}{" "}
              <span className="text-red-500">
                {t("enterprisePlan.form.required")}
              </span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder={t("enterprisePlan.form.companyName.placeholder")}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("enterprisePlan.form.workEmail.label")}{" "}
              <span className="text-red-500">
                {t("enterprisePlan.form.required")}
              </span>
            </label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleInputChange}
              placeholder={t("enterprisePlan.form.workEmail.placeholder")}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("enterprisePlan.form.phoneNumber.label")}{" "}
              <span className="text-red-500">
                {t("enterprisePlan.form.required")}
              </span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder={t("enterprisePlan.form.phoneNumber.placeholder")}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("enterprisePlan.form.hiringNeeds.label")}{" "}
              <span className="text-red-500">
                {t("enterprisePlan.form.required")}
              </span>
            </label>
            <textarea
              name="hiringNeeds"
              value={formData.hiringNeeds}
              onChange={handleInputChange}
              placeholder={t("enterprisePlan.form.hiringNeeds.placeholder")}
              required
              rows={4}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitEnterpriseMutation.isPending}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitEnterpriseMutation.isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("enterprisePlan.form.submitting")}
                </span>
              ) : (
                t("enterprisePlan.form.submitButton")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillingEnterpriseForm;
