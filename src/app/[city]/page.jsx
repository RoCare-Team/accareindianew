'use client';

import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import { useSearchParams, usePathname } from 'next/navigation'; // ✅ Import usePathname here
import City from "../components/pages/city/City";

function Privacy() {
    const [admin , setAdmin] = useState([]);
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const pathname = usePathname(); // ✅ Now usePathname will work
    const route = pathname.split('/')[1] || ''; 

    // console.log("get url: " + route);

    useEffect(() => {
        const fetchSubServices = async () => {
            try {
                const leadTypeCollection = collection(db, "page_tb");
                const q = query(leadTypeCollection, where('page_url', '==',route));
                const snapshot = await getDocs(q);

                console.log("Firestore snapshot size:", snapshot.size);

                const subServicesData = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    console.log("Document data:", data);
                    return data;
                });

                setAdmin(subServicesData);
            } catch (err) {
                console.error("Error fetching sub-services:", err);
                setError(err.message);
                setAdmin([]);
            } finally {
                // Optional cleanup
            }
        };

        fetchSubServices();
    }, []);

    console.log(admin);

    return (
       <City servicedata={admin}/>
    )
}

export default Privacy;
