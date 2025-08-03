import { createContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { billingScreens } from "@/constants/billing.constant";
import { IBillingContext, IScreen } from "@/interfaces/billing.interface";

export const BillingContext = createContext<IBillingContext>({
  goTo: () => {},
});

export function BillingProvider() {
  const searchParams = useSearchParams();
  const [screen, setScreen] = useState<IScreen>(
    Object.keys(billingScreens)[0] as IScreen
  );

  // Handle URL parameters to set initial screen
  useEffect(() => {
    if (searchParams) {
      const screenParam = searchParams.get("screen") as IScreen;
      if (screenParam && billingScreens[screenParam]) {
        setScreen(screenParam);
      }
    }
  }, [searchParams]);

  const value = { goTo: setScreen } satisfies IBillingContext;

  const Screen = useMemo(() => billingScreens[screen], [screen]);

  return (
    <BillingContext.Provider value={value}>
      <Screen />
    </BillingContext.Provider>
  );
}
