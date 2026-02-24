import { createContext } from "react";

interface PlanData {
    plan_price: string;
    plan_name: string;
    plan_name_lt: string;
    plan_period: string;
    price: string;
}

export interface PaymentContextValue {
    isLoading: boolean;
    period: string;
    setPeriod: (period: string) => void;
    variant: string;
    setVariant: (variant: string) => void;
    plan: Record<string, PlanData>;
    handleSubscriptionCheckout: () => Promise<void>;
    handleServiceCheckout: (paslauga: Record<string, unknown>, code?: string, isCodeApproved?: boolean) => Promise<void>;
}

export const PaymentContext = createContext<PaymentContextValue | undefined>(undefined);
