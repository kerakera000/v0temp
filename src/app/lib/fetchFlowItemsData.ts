import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { FlowData } from "../types/flow";

export async function fetchFlowItemsData(): Promise<FlowData | null> {
  try {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().flowItems;
      return {
        flowItems: data.map((item: any) => ({
          text: item.text || "",
          title: item.title || "",
        })) || [],
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Flow Items data:", error);
    return null;
  }
}

