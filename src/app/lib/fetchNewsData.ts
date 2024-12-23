import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { NewsItem } from "../types/news";

export async function fetchNewsData(): Promise<NewsItem[]> {
  try {
    // クエリを変更：where を削除し、すべてのデータを取得
    const q = query(
      collection(db, "announcements"),
      orderBy("date", "desc") // 日付で降順にソート
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

    return items;
  } catch (error) {
    console.error("Error fetching News data:", error);
    throw new Error("ニュースデータの取得に失敗しました");
  }
}
