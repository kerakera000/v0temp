import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AboutData } from "../types/about";

export async function fetchAboutData(): Promise<AboutData | null> {
  try {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().about;
      return {
        text: data.text || "",
        image: data.image || "",
        title: data.title || "",
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching About data:", error);
    return null;
  }
}

