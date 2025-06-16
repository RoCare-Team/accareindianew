
import Tabs from "@/app/components/pages/Services/AllServices";
import Assurance from "@/app/components/Assurance/Assurance";
import ServiceProcedure from '@/app/components/serviceProcedure/index';
import AllServicesList from "@/app/components/pages/Services/Services";
import ServicesList from "@/app/components/service/ServicesList";
import HomeCareService from "../../servicesSection/homeCareService";
import ServiceSection from "../../servicesSection/servicesSection";



const City = ({ city, cityData }) => {

    // console.log("test" + JSON.stringify(cityData));

 
        return (
            <div>
                <div className="flex flex-col lg:flex-row  bg-gray-200 common-spacing ">
                    <div className="lg:w-1/4 w-full bg-white shadow-md p-4 rounded-2xl">
                        <div className="sticky top-20">
                            <h3 className="cityHeadings">Most Loved Services by Our Customers!</h3>
                            <div className="mobileBanner mb-3   ">
                                
                               
                               
                            </div>
                            <Tabs cat={city} />
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
                                <h2 className="ml-2.5 mt-1.5 text-2xl"><b>{cityData?.categorydetail?.category_name}</b></h2>


                                {/* <ServicesList category={city} status={cityData.status} /> */}
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
                        <h3 className="catgoreyTitle">ABOUT AC Care India </h3>
                        {/* <div dangerouslySetInnerHTML={{ __html: cityData?.categorydetail?.category_content }} className="serviceContentStyle" /> */}
                    </div>
                </div>
            

            </div>

        );

};

export default City;