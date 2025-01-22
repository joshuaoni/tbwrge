import DashboardSettingsLayout from "@/components/settings/layout";
import { BillingProvider } from "../../../../providers/billing.context";

const BillingsAndSubscriptionPage = () => {
  return (
    <DashboardSettingsLayout>
      <BillingProvider />
    </DashboardSettingsLayout>
  );
};

export default BillingsAndSubscriptionPage;
