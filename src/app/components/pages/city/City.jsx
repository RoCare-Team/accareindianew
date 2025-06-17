'use client'
import Tabs from "@/app/components/pages/Services/AllServices";
import Assurance from "@/app/components/Assurance/Assurance";
import ServiceProcedure from '@/app/components/serviceProcedure/index';
import AllServicesList from "@/app/components/pages/Services/Services";
import ServicesList from "@/app/components/service/fakelist";
import HomeCareService from "../../servicesSection/homeCareService";
import ServiceSection from "../../servicesSection/servicesSection";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import { useSearchParams, usePathname } from 'next/navigation'

const City = () => {
     const [admin , setAdmin] = useState([]);
    const [error, setError] = useState(null);
    const [allPages, setAllPages] = useState([]);
    const [popularCities, setPopularCities] = useState([]);
    const [brandwisePages, setBrandwisePages] = useState([]);
    const [pageDetails, setPageDetails] = useState({});
    const searchParams = useSearchParams();
    const pathname = usePathname(); 
    const route = pathname.split('/')[2] || ''; 

    // console.log("get url: " + route);

    useEffect(() => {
        const fetchSubServices = async () => {
            try {
                const leadTypeCollection = collection(db, "landing_page");
                const q = query(leadTypeCollection, where("page_url", "==", route));
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

    // console.log("test" + JSON.stringify(cityData));
const servicedata=admin;
const pageDetail = servicedata?.[0] || {};


const { brand = '', location = '', service_type = '', tier = '', category = '', show_num_flag = '',state= '',page_url='' } = pageDetail;
const servicename="ro-water-purifier";
    useEffect(() => {
        const fetchData = async () => {
            try {
              
                
                    // Fetch 1: All related services (like first PHP block)
                    const allPagesQuery = query(
                        collection(db, 'landing_page'),
                        where('brand', '==', brand),
                        where('location', '==', 'India')
                        
                    );
                    const allPagesSnap = await getDocs(allPagesQuery);
                    const allPagesData = allPagesSnap.docs.map(doc => doc.data());
                    setAllPages(allPagesData);

                    // Fetch 2: Popular cities services (like second PHP block)
                    if (location !== "India") {
                        const popularCitiesQuery = query(
                            collection(db, 'landing_page'),
                            where('service_type', '==', service_type),
                            where('brand', '==', brand),
                            where('state', '==', state),
                           
                            
                             // Assuming 'state' is available in data
                        );
                        const popularCitiesSnap = await getDocs(popularCitiesQuery);
                        const popularCitiesData = popularCitiesSnap.docs.map(doc => doc.data());
                        setPopularCities(popularCitiesData);
                    }

                    // Fetch 3: All page links brandwise (like third PHP block)
                    if (location === "India") {
                        const brandwisePagesQuery = query(
                            collection(db, 'landing_page'),
                            where('service_type', '==', service_type),
                            where('brand', '==', brand),
                            where('category', '==', category)
                            
                             // Exclude current page
                        );
                        const brandwisePagesSnap = await getDocs(brandwisePagesQuery);
                        const brandwisePagesData = brandwisePagesSnap.docs.map(doc => doc.data());
                        setBrandwisePages(brandwisePagesData);
                    }

                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [brand, location, service_type, category,state,page_url]);

        return (
            <div>
                <div className="flex flex-col lg:flex-row  bg-gray-200 common-spacing ">
                    <div className="lg:w-1/4 w-full bg-white shadow-md p-4 rounded-2xl">
                        <div className="sticky top-20">
                            <h3 className="cityHeadings">{servicedata[0]?.page_title}</h3>
                            <div className="mobileBanner mb-3   ">
                                
                               
                               
                            </div>
                            <Tabs/>
                        </div>
                    </div>
                    <div className="lg:w-3/4 w-full ">
                        <div className="px-1 flex lg:flex-row flex-col justify-center">
                            <div className=" md:w-3xl w-full px-2">

                                <div className=" desktopBanner mb-3.5 h-64 w-full rounded-2xl flex items-center justify-center cat-service-style">
                                    {/* <img src={`/assets/categorybanner/${cityData.catbanner}`} alt={`${cityData?.categorydetail?.category_name}`} title={`${cityData?.categorydetail?.category_name}`} width={475} height={345}
                                        className="h-64 w-full rounded-2xl"
                                    /> */}
                                    
                                  
                                </div>
                                <h2 className="ml-2.5 mt-1.5 text-2xl"><b>{servicedata?.categorydetail?.category_name}</b></h2>


                                <ServicesList  />
                            </div>
                            <div className=" cartContainer">
                                <div className="cart-body-section">

                                    <Assurance />
                                    <ServiceProcedure />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="common-spacing">
                    <div className=" bg-white aboutStyle">
                        <h3 className="catgoreyTitle">ABOUT  </h3>
                        <div dangerouslySetInnerHTML={{ __html: servicedata[0]?.content_text }} className="serviceContentStyle" />
                    </div>
                </div>

             <div className="bg-white p-4">
                 <h3>
                All {brand === "Common" ? "RO" : brand} Related Service-
            </h3>
            <ul className="text-blue-600 flex items-start ">
                {allPages.map((page, idx) => (
                    <li key={idx} className="bg-blue-300 rounded-2xl p-1.5">
                        <a href={`${page.page_url}`} className="text-blue-600">
                            <i className="fa fa-location"></i>&nbsp;&nbsp;
                            {page.brand === "Common" ? 
                                page.page_url.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : 
                                `${page.brand} ${page.service_type}`}
                            <i className="fa fa-arrow-right"></i>
                        </a>
                    </li>
                ))}
            </ul>
             </div>

            {location !== "India" && (
                <div className="bg-white p-4">
                    <h3>
                        {brand === "Common" ? "RO" : brand} Service in Popular Cities-
                    </h3>
                    <ul className="text-blue-600 flex  flex-wrap  gap-2 items-start">
                        {popularCities.map((page, idx) => (
                            <li key={idx} className="bg-blue-300 rounded-2xl p-1.5">
                                <a href={`${page.page_url}`}>
                                    <i className="fa fa-location"></i>&nbsp;&nbsp;
                                    {page.brand === "Common" ? 
                                        page.page_url.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : 
                                        `${page.category} ${page.service_type} ${page.location}`}
                                    <i className="fa fa-arrow-right"></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {location === "India" && (
                <div className="bg-white px-2"> 
                    <h3>
                        {brand === "Common" ? `${category} ${service_type} In India` : `${brand} ${service_type} In India`}
                    </h3>
                    <div className="bg-white flex flex-wrap gap-2 common-spacing">
                        {brandwisePages.map((page, idx) => (
                            <div className="mns   " key={idx}>
                                <a href={`${page.page_url}`} className="bg-blue-300 rounded-xl p-1.5 ">
                                    <i className="fa fa-location">&nbsp;&nbsp;</i>
                                    {brand === "Common" ? 
                                        page.page_url.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : 
                                        `${page.category} ${page.service_type} ${page.location}`}
                                    <i className="fa fa-arrow-right"></i>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
              
            

            </div>

        );

};

export default City;