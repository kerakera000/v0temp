import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { KVData } from "../types/kv";

export async function fetchKvData(): Promise<KVData | null> {
  try {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().kv;
      return {
        image: data.image || "",
        strength1: data.strength1 || "",
        strength2: data.strength2 || "",
        strength3: data.strength3 || "",
        text: data.text || "",
        title: data.title || "",
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching KV data:", error);
    return null;
  }
}

