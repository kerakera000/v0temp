export interface PricingPlan {
  id: string;
  listItems: string[];
  monthlyFee: string;
  name: string;
}

export interface PricingData {
  pricingPlans: PricingPlan[];
}

