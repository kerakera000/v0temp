import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { ServicesData } from "../types/services";

export async function fetchServicesData(): Promise<ServicesData | null> {
  try {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().services;
      return {
        kvImage: data.kvImage || "",
        items: data.items.map((item: any) => ({
          image: item.image || "",
          subtitle: item.subtitle || "",
          title: item.title || "",
        })) || [],
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Services data:", error);
    return null;
  }
}

