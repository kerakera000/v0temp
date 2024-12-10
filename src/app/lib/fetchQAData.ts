import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { QAData, QAItem } from "../types/qa";

export async function fetchQAData(): Promise<QAData | null> {
  try {
    const querySnapshot = await getDocs(collection(db, "qas"));
    const items: QAItem[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      items.push({
        answer: data.answer || "",
        question: data.question || "",
      });
    });

    return { items };
  } catch (error) {
    console.error("Error fetching QA data:", error);
    return null;
  }
}

