import DashboardSettingsLayout from "../layout";
import { BillingProvider } from "./billing.context";

const BillingsAndSubscriptionPage = () => {
  return (
    <DashboardSettingsLayout>
      <BillingProvider />
    </DashboardSettingsLayout>
  );
};

export default BillingsAndSubscriptionPage;
