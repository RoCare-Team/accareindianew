import React from 'react'
import Link from 'next/link';

function StateLinks() {
    const State = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
        'Kolkata', 'Noida', 'Ghaziabad', 'Faridabad', 'Surat', 'Pune',
        'Jaipur', 'Lucknow', 'Kanpur', 'Thane', 'Patna', 'Indore',
        'Bhopal', 'Ranchi', 'Greater Noida', 'Meerut', 'Varanasi',
        'Allahabad', 'Prayagraj', 'Chandigarh'];


    return (
        <div className="ro-service-cities">
            <h2>AC Service in Popular Cities</h2>
            <div className="state-links flex flex-wrap gap-2.5 ">
                {State.map((city) => (
                    <Link

                    // ac-service
                        key={city}
                        href={`/ac-service-${city.toLowerCase().replace(/\s+/g, "-")}`}
                        className="state-link  "
                       title={`${city.toLowerCase().replace(/\s+/g, " ")} Air conditioner services ` }
                    >
                        {city}
                    </Link>
                ))}
            </div>
        </div>
    );
};


export default StateLinks