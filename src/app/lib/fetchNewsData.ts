import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { NewsData, NewsItem } from "../types/news";

export async function fetchNewsData(): Promise<NewsData | null> {
  try {
    const cutoffDate = new Date('2024-12-10');
    const q = query(
      collection(db, "announcements"),
      where("date", "<=", Timestamp.fromDate(cutoffDate)),
      orderBy("date", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const items: NewsItem[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.date?.toDate();
      items.push({
        id: doc.id,
        content: data.content || "",
        date: date ? date.toLocaleDateString('ja-JP') : "",
        title: data.title || "",
      });
    });

    return { items };
  } catch (error) {
    console.error("Error fetching News data:", error);
    return null;
  }
}

