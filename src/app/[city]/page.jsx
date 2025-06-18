import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import City from "../components/pages/city/City";

   export async function generateMetadata({ params }) {
    const city  = params.city; 
    console.log(city);
    
   const canonicalPath = `/${city}`;
    console.log("Server Slug from URL:", city); // ✅ Now will print correctly

    // // Example Firebase query (optional):
    const q = query(
        collection(db, "page_tb"),
        where("page_url", "==", city)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        return {
            title: data.page_title || "Default Title",
            description: data.page_description || "Default Description",
            keywords: data.page_keywords || "Default Description",
            alternates: {
      canonical: canonicalPath,
    },
        };
    }

    return {
        title: "Default Title",
        description: "Default Description",
    };
}

export default function Page({ params }) {
    const { city } = params;

    return (
        <City city={city} />  // pass the city to City.jsx
    );
}