import { billingScreens } from "@/constants/billing.constant";
import type { Dispatch, ElementType, SetStateAction } from "react";

export type IScreen = keyof typeof billingScreens;

export interface IBillingContext {
  goTo: Dispatch<SetStateAction<IScreen>>;
}

export interface BillingPlanCardProps {
  name: string;
  pricePerMonth: number;
  description: string;
  features: string[];
  isActive: boolean;
  invert?: boolean;
}

export interface BillingInputGroupProps {
  label: string;
  placeholder: string;
  icon?: ElementType<{ className: string }>;
  value?: string;
  onChange?: (value: string) => void;
}
