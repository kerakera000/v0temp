import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { CampaignData, CampaignItem } from "../types/campaign";

export async function fetchCampaignData(): Promise<CampaignItem | null> {
  try {
    const docRef = doc(db, "campaigns", "all");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.items && data.items.length > 0) {
        return data.items[0] as CampaignItem;
      }
    }
    console.log("No campaign data found!");
    return null;
  } catch (error) {
    console.error("Error fetching Campaign data:", error);
    return null;
  }
}

