'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


function ServiceSection() {

    const [showAllServices, setShowAllServices] = useState(false);
    const urlPath = usePathname();


    const careServices = [
        {
            id: 1,
            serviceImg: '/assets/images/acCareImg.jpeg',
            serviceHeading: ' AC service (Split)',
            servicePrice: '₹ 499/-',
            serviceInfo: 'Quick and reliable repair services for all your home needs.',
            // serviceList:[
            //     {  
            //     // for future purposes
            //     }
            // ],
            serviceUrl: 'ac-service',
            serviceReview: '3.5 K',
        },
        {
            id: 2,
            serviceImg: '/assets/images/acCareCool.jpeg',
            serviceHeading: 'RO Water Purifier Service',
            servicePrice: '₹ 399/-',
            serviceInfo: 'Expert RO servicing including filter change, deep cleaning, and performance check to ensure safe and healthy drinking water.',

            serviceUrl: 'ro/ro-water-purifier-service',
            serviceReview: '3.5 K',
        },
        {
            id: 3,
            serviceImg: '/assets/images/acCareImg.jpeg',
            serviceHeading: 'Refrigerator Repair Service',
            servicePrice: '₹ 399/-',
            serviceInfo: 'Fast and professional repair service for single and double-door refrigerators to keep your food fresh and cool.',


            serviceUrl: 'refrigerator-repair',
            serviceReview: '3.5 K',
        },
        {
            id: 4,
            serviceImg: '/assets/AC Banner/AC Banner 4.webp',
            serviceHeading: 'AC service (Window)',
            servicePrice: '₹ 499/-',
            serviceInfo: 'Quick and reliable repair services for all your home needs.',
            serviceUrl: 'ac-service',
            serviceReview: '3.5 K',
        },

    ]

    return (
        <div className=" common-spacing">
            <h3 className="text-3xl mb-1.5 text-center text-black "><b>Explore Our Services</b></h3>
            {/* <button onClick={handleApi}>apii call</button> */}
            <h5 className="text-gray-600 text-center mb-5">We offer a comprehensive range of home services to keep your property in perfect condition. <br /> Choose the service you need or contact us for custom solutions.</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 servicesHero">
                {careServices.map((service) => (
                  
                   <div className="bg-white h-auto shadow-md rounded-xl hover:-translate-y-0.5  hover:shadow-blue-100" key={service.id}>
                     <a href={`/${service.serviceUrl}`} >
                        <div className="w-full">
                            <img src={service.serviceImg} className="h-38 w-full rounded-t-md  bg-gray-300 "></img>
                        </div>
                        <div className="md:p-5 p-2 flex items-start justify-center flex-col  md:gap-3">
                            <div className="flex flex-row justify-between items-center w-full">
                                <h2 className="text-black  text-xs md:text-sm">{service.serviceHeading}</h2>
                                <span className="serivceReview-style"><b>{service.serviceReview} Reviews</b></span>
                            </div>
                            <h5 className="text-gray-500 text-wrap p-0 text-xs md:text-sm md:pr-10">{service.serviceInfo}</h5>
                            <div className="flex flex-row justify-between items-center w-full">
                                <a href={`/${service.serviceUrl}`} className="learn-more-link text-xs md:text-sm">View Service</a>
                                <span className="text-gray-500 text-xs md:text-sm">{service.servicePrice}</span>
                            </div>
                        </div>
</a>
                    </div>
                  
                ))}
            </div>

        </div>
    );
}

export default ServiceSection;