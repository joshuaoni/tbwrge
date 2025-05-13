import DashboardSettingsLayout from "@/components/settings/layout";
import { BillingProvider } from "../../../providers/billing.context";
import DashboardWrapper from "@/components/dashboard-wrapper";

const BillingsAndSubscriptionPage = () => {
  return (
    <DashboardWrapper>
      <BillingProvider />
    </DashboardWrapper>
  );
};

export default BillingsAndSubscriptionPage;
