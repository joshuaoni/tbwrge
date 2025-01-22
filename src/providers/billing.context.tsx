import { createContext, useMemo, useState } from "react";

import { billingScreens } from "@/constants/billing.constant";
import { IBillingContext, IScreen } from "@/interfaces/billing.interface";

export const BillingContext = createContext<IBillingContext>({
  goTo: () => {},
});

export function BillingProvider() {
  const [screen, setScreen] = useState<IScreen>(
    Object.keys(billingScreens)[0] as IScreen
  );

  const value = { goTo: setScreen } satisfies IBillingContext;

  const Screen = useMemo(() => billingScreens[screen], [screen]);

  return (
    <BillingContext.Provider value={value}>
      <Screen />
    </BillingContext.Provider>
  );
}
