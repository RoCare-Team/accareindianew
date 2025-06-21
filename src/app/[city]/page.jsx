import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import Acservices from "../components/pages/acservices/acservices";
import { notFound } from "next/navigation";
   export async function generateMetadata({ params }) {
    const city  = params.city; 
    // console.log(city);
    
   const canonicalPath = `/${city}`;
    console.log("Server Slug from URL:", city); 

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

     if (querySnapshot.empty) {
       return notFound();
     }

    return {
        title: "Default Title",
        description: "Default Description",
    };
}

export default function Page({ params }) {
    const { city } = params;

    return (
        <Acservices  />  // pass the city to City.jsx
    );
}