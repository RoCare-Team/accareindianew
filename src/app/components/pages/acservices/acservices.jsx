"use client"

import React, { useState, useEffect } from "react";
import Tabs from "@/app/components/pages/Services/AllServices";
import Assurance from "@/app/components/Assurance/Assurance";
import ServiceProcedure from '@/app/components/serviceProcedure/index';
import AllServicesList from "@/app/components/pages/Services/Services";
import ServicesList from "@/app/components/service/fakelist";
import HomeCareService from "../../servicesSection/homeCareService";
import Cart from "../../cart/Cart";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import { usePathname, useSearchParams } from "next/navigation";


const Acservices = ({ city }) => {
    const [admin, setAdmin] = useState([]);
    const [error, setError] = useState(null);
    const [addedServices, setAddedServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [cartChanged, setCartChanged] = useState(false);
    const [cartLoaded, setCartLoaded] = useState(false);
    const [allPages, setAllPages] = useState([]);
    const [popularCities, setPopularCities] = useState([]);
    const [brandwisePages, setBrandwisePages] = useState([]);
    const [showAll, setShowAll] = useState(false)
    const [indiaShow, setIndiaShow] = useState(false);
    const [openItem, setOpenItem] = useState(0);
    const [catservice, setCatService] = useState([]);
    const [relatedServices, setRelatedServices] = useState([]);
  const [otherBrands, setOtherBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [brandwiseLinks, setBrandwiseLinks] = useState([]);
    const pathname = usePathname();
    
    const segments = pathname.split('/').filter(Boolean); // removes empty segments
const route = segments[segments.length - 1] || '';

    // console.log("test" + route);
    const indiaPages = indiaShow ? brandwisePages : brandwisePages.slice(0, 13);

    // const visiblePages = showAll ? popularCities : popularCities.slice(0, 14);

    useEffect(() => {
        const fetchSubServices = async () => {
            try {

                 let subServicesData = [];

                const leadTypeCollection = collection(db, "page_tb");
                const q = query(leadTypeCollection, where("page_url", "==", route));
                const snapshot = await getDocs(q);

                console.log("Firestore snapshot size:", snapshot.size);

                 subServicesData = snapshot.docs.map((doc) => {
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

    const servicedata = admin;
    const pageDetail = servicedata?.[0] || {};

    const { brand = '', location = '', service_type = '',page_description='', tier = '', category = '', show_num_flag = '', state = '', page_url = '', page_faq_que_one = '', page_faq_ans_five = '', page_faq_ans_four = '', page_faq_ans_one = '', page_faq_ans_three = '', page_faq_ans_two = '', page_faq_que_five = '', page_faq_que_four = '', page_faq_que_two = '', page_faq_que_three = '' } = pageDetail;

    useEffect(() => {
    let catservice = "";

    // Combine page_url and route logic
    const base = page_url || route;

    // Use regex to match up to "-service" and remove everything after it
    const match = base.match(/^(.*?)-/);
    
    if (match) {
        catservice = match[1]; // ro-water-purifier or ac
    } else {
        catservice = base;
    }

    setCatService(catservice);
}, [page_url, route]);

  
  useEffect(() => {
    const fetchData = async () => {
      // Related Services in India
                const relatedServicesQuery = query(
            collection(db, "page_tb"),
            where("brand", "==", brand),
            where("location", "==", "India"),
            where("category", "==", category)
            );
            const relatedSnapshot = await getDocs(relatedServicesQuery);
            const relatedServices = relatedSnapshot.docs.map(doc => doc.data());

      setRelatedServices(relatedServices);

      // Other Brands in Location
      if (brand !== "Common") {
        const otherBrandsQuery = query(
            collection(db, "page_tb"),
            where("service_type", "==", service_type),
            where("location", "==", location),
            where("brand", "!=", brand),
            where("category", "==", category)
            );
            const otherSnapshot = await getDocs(otherBrandsQuery);
            const otherBrands = otherSnapshot.docs.map(doc => doc.data());

        setOtherBrands(otherBrands);
      }

      // All Brands in Location
      if (brand === "Common") {
        const allBrandsQuery = query(
            collection(db, "page_tb"),
            where("service_type", "==", service_type),
            where("location", "==", location),
            where("category", "==", category)
            );
            const allBrandsSnapshot = await getDocs(allBrandsQuery);
            const allBrands = allBrandsSnapshot.docs.map(doc => doc.data());

        setAllBrands(allBrands);
      }

      // Popular Cities (other than India)
      if (location !== "India") {
        const stateQuery = query(
            collection(db, "landing_page"),
            where("location", "==", location)
            );
            const stateSnapshot = await getDocs(stateQuery);
            const state = !stateSnapshot.empty ? stateSnapshot.docs[0].data().state : null;
            let popularCities = [];
            
            
            if(state!=null){
                
              const brandwiseQuery = query(
                        collection(db, "page_tb"),
                        where("service_type", "==", service_type),
                        where("brand", "==", brand),
                        where("category", "==", category),
                        where("state", "==", state),
                        limit(20)
                        );
            const popularCitiesSnapshot = await getDocs(brandwiseQuery);
            popularCities = popularCitiesSnapshot.docs.map(doc => doc.data());
            }
console.log( 'state' + popularCities);
        setPopularCities(popularCities);
      }

      // All Page Links for India Brandwise
      if (location === "India") {
        const brandwiseQuery = query(
            collection(db, "page_tb"),
            where("service_type", "==", service_type),
            where("brand", "==", brand),
            where("category", "==", category)
            );
            const brandwiseSnapshot = await getDocs(brandwiseQuery);
            const brandwiseLinks = brandwiseSnapshot.docs
            .map(doc => doc.data())
            .filter(item => item.page_url !== page_url); // exclude current pageURL

        setBrandwiseLinks(brandwiseLinks);
      }
    };

    fetchData();
  }, [brand, category, location, service_type, page_url]);

   const renderLink = (item) => (
    <li className="bg-blue-300 rounded-xl p-2" key={item.page_url}>
      <a href={`/${item.page_url}`} target="_blank" rel="noopener noreferrer">
        {item.brand === "Common"
          ? item.page_url.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
          : `${item.brand} ${item.category} ${item.service_type} ${item.location}`}
      </a>
    </li>
  );
    useEffect(() => {
        const loadCartFromLocalStorage = () => {
            try {
                const savedCartItems = localStorage.getItem('service_name');
                const savedCartTotal = localStorage.getItem('total_price');


                if (savedCartItems && savedCartTotal) {
                    const parsedItems = JSON.parse(savedCartItems);
                    const parsedTotal = parseFloat(savedCartTotal);

                    // console.log("ServicePage loading cart from localStorage:", parsedItems);

                    setSelectedServices(parsedItems);
                    setTotalAmount(parsedTotal);

                    // Update addedServices array with ids from loaded cart items
                    const serviceIds = parsedItems.map(item => item.id);
                    setAddedServices(serviceIds);
                    setCartLoaded(true);
                }
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            }
        };

        loadCartFromLocalStorage();
    }, []);

    const handleCartLoading = () => {
        setCartLoaded(prevState => prevState + 1);
        setCartChanged(prev => !prev);
    };

    useEffect(() => {
        if (selectedServices.length > 0) {
            const total = selectedServices.reduce(
                (acc, curr) => acc + (curr.price * (curr.quantity || 1)),
                0
            );

            setTotalAmount(total);

            // Update localStorage with the latest cart state
            // localStorage.setItem('cartItems', JSON.stringify(selectedServices));
            // localStorage.setItem('cartTotal', total.toString());
        } else {
            // setTotalAmount(0);
            // localStorage.removeItem('cartItems');
            // localStorage.removeItem('cartTotal');
        }
    }, [selectedServices]);





    // console.log("test" + JSON.stringify(cityData?.city_detail?.city_content));
    // const cleanContent = he.decode(cityData?.categorydetail?.category_content);

    return (
        <div>
            <div className="flex flex-col lg:flex-row  bg-gray-200 common-spacing ">
                <div className="lg:w-1/4 w-full bg-white shadow-md p-4 rounded-2xl">
                    <div className="sticky top-20">
                        {/* ${pagedata.category_name?.replace("Service", "")} */}
                        <h1 className="cityHeadings"><b>{servicedata[0]?.page_name}</b></h1>
                        <div className="mobileBanner mb-3   ">
                            {/* <img src={`/assets/categorybanner/${cityData.catbanner}`} alt={`${cityData?.categorydetail?.category_name}`} title={`${cityData?.categorydetail?.category_name}`} width={475} height={345} style={{
                                    borderRadius: '17px', width: '100%'
                                }} */}
                            {/* /assets/cityBanner/Front Banner.webp */}
                            {/* <img src={`/assets/categorybanner/${cityData.catbanner}`} alt={`${cityData?.categorydetail?.category_name}`} title={`${cityData?.categorydetail?.category_name}`} width={475} height={345} style={{
                                    borderRadius: '17px', width: '100%'
                                }}
                                /> */}
                        </div>
                        <Tabs red={catservice} />
                    </div>
                </div>
                <div className="lg:w-3/4 w-full ">
                    <div className="px-1 flex lg:flex-row flex-col justify-center">
                        <div className=" md:w-3xl w-full px-2">

                            <div className=" desktopBanner mb-3.5 h-64 w-full rounded-2xl flex items-center justify-center cat-service-style">

                            </div>



                            <ServicesList category={catservice} state={cartChanged} addedServices={addedServices} handleCartLoading={handleCartLoading} />
                        </div>
                        <div className="lg:w-5/12 cartContainer">
                            <div className="cart-body-section">

                                <Cart
                                    cartLoaded={cartLoaded}
                                    cartLoadedToggle={handleCartLoading}
                                />
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


            <div className=" bg-white common-spacing">
                <h2 className="text-4xl font-bold text-blue-600 mb-6">Frequently Asked Questions</h2>

                <div className="flex flex-wrap">
                    <div className='lg:w-1/2  py-3.5 px-7'>
                        <img src="/assets/images/newFaqCon.webp" alt='Faq Image Icon' width={629} height="auto" title="Faq ro Services" className=' w-full ' />
                    </div>
                    <div className="space-y-4 lg:w-1/2">

                        <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                            <button
                                onClick={() => setOpenItem(openItem === 1 ? null : 1)}
                                className={`w-full p-4 text-left flex justify-between items-center `}
                            >
                                <span className="font-medium text-gray-800">{page_faq_que_one || "Do you provide AC repair for all brands in Delhi?"}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-600 transform transition-transform `}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openItem == 1 && (
                                <div className="p-4 bg-white border-t border-purple-100">
                                    <p className="text-gray-600">
                                        {page_faq_ans_one || " Yes, we repair all major AC brands including LG, Samsung, Voltas, Daikin, Blue Star, and more."}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                            <button
                                onClick={() => setOpenItem(openItem === 2 ? null : 2)}
                                className={`w-full p-4 text-left flex justify-between items-center `}
                            >
                                <span className="font-medium text-gray-800">{page_faq_que_two || "Is gas refilling available for split and window ACs?"}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-600 transform transition-transform `}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openItem == 2 && (
                                <div className="p-4 bg-white border-t border-purple-100">
                                    <p className="text-gray-600">
                                        {page_faq_ans_two || "  Yes, we offer AC gas refilling, servicing, and installation for both split and window ACs."}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                            <button
                                onClick={() => setOpenItem(openItem === 3 ? null : 3)}
                                className={`w-full p-4 text-left flex justify-between items-center `}
                            >
                                <span className="font-medium text-gray-800">{page_faq_que_three || " What types of washing machines do you repair?"}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-600 transform transition-transform `}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openItem == 3 && (
                                <div className="p-4 bg-white border-t border-purple-100">
                                    <p className="text-gray-600">
                                        {page_faq_ans_three || " We repair front load, top load, semi-automatic, and fully automatic washing machines."}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                            <button
                                onClick={() => setOpenItem(openItem === 4 ? null : 4)}
                                className={`w-full p-4 text-left flex justify-between items-center `}
                            >
                                <span className="font-medium text-gray-800">{page_faq_que_four || " Do you use genuine spare parts?"}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-600 transform transition-transform `}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openItem == 4 && (
                                <div className="p-4 bg-white border-t border-purple-100">
                                    <p className="text-gray-600">
                                        {page_faq_ans_four || " Yes, we use 100% original and brand-certified parts for all washing machine repairs."}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                            <button
                                onClick={() => setOpenItem(openItem === 5 ? null : 5)}
                                className={`w-full p-4 text-left flex justify-between items-center `}
                            >
                                <span className="font-medium text-gray-800">{page_faq_que_five || "How often should I get my RO serviced?"}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-600 transform transition-transform `}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openItem == 5 && (
                                <div className="p-4 bg-white border-t border-purple-100">
                                    <p className="text-gray-600">
                                        {page_faq_ans_five || " It’s recommended every 3–6 months to ensure water purity and machine efficiency."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>



            </div>
            <div className="interlinking-accareindia px-4 mt-2">
      <div>
        <h3 className="text-xl font-bold mb-1.5">All {brand === "Common" ? category : brand} Related Service-</h3>
        <ul className="flex flex-wrap gap-2 items-start">{relatedServices.map(renderLink)}</ul>
      </div>

      {brand !== "Common" && (
        <div className="">
          <h3 className="text-xl font-bold mb-1.5">Other Brands {category} Service in {location} -</h3>
          <ul className="flex flex-wrap gap-2 items-start" >{otherBrands.map(renderLink)}</ul>
        </div>
      )}

      {brand === "Common" && (
        <div className="">
          <h3 className="text-xl font-bold mb-1.5">All Brands {category} Service in {location} -</h3>
          <ul className="flex flex-wrap gap-2 items-start">{allBrands.map(renderLink)}</ul>
        </div>
      )}

      {location !== "India" && (
        <div>
          <h3 className="text-xl font-bold mb-1.5">{brand === "Common" ? category : brand} Service in Popular Cities -</h3>
          <ul className="flex flex-wrap gap-2 items-start">{popularCities.map(renderLink)}</ul>
        </div>
      )}

      {location === "India" && (
        <div>
          <h3 className="text-xl font-bold mb-1.5">{brand === "Common" ? `${category} ${service_type}` : `${brand} ${category} ${service_type}`} In India</h3>
          <ul className="flex flex-wrap gap-2 items-start">{brandwiseLinks.map(renderLink)}</ul>
        </div>
      )}
    </div>



        </div>

    );

};

export default Acservices;