import BillingAddCard from "@/components/settings/billing/add-card";
import BillingChooseView from "@/components/settings/billing/choose-bills";
import BillingManageView from "@/components/settings/billing/manage-bills";
import BillingEnterpriseForm from "@/components/settings/billing/enterprise-form";

export const billingScreens = {
  manage: BillingManageView,
  choose: BillingChooseView,
  add: BillingAddCard,
  enterprise: BillingEnterpriseForm,
};
