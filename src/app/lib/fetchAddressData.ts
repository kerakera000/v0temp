import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AddressData } from "../types/address";

export async function fetchAddressData(): Promise<AddressData | null> {
  try {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().address;
      return {
        buildingName: data.buildingName || "",
        city: data.city || "",
        prefecture: data.prefecture || "",
        zipCode: data.zipCode || "",
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Address data:", error);
    return null;
  }
}

