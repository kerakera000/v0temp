import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { PricingData } from "../types/pricing";

export async function fetchPricingData(): Promise<PricingData | null> {
  try {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().pricingPlans;
      return {
        pricingPlans: data.map((plan: any) => ({
          id: plan.id || "",
          listItems: plan.listItems || [],
          monthlyFee: plan.monthlyFee || "",
          name: plan.name || "",
        })) || [],
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Pricing data:", error);
    return null;
  }
}

