"use client"
import React from "react";
import StateLinks from "../stateLinks/StateLinks";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      {/* bg-gradient-to-r from-indigo-800 to-purple-900 */}
      <div className="flex flex-col gap-8">
        {/*  RO Popular Cities */}
        <div className="mb-2.5">
          <h3 className="text-lg font-semibold mb-4"> Ro Service in Popular Cities</h3>
          <div className="flex flex-wrap gap-2">
            {["Gurgaon",
              "Delhi",
              "Mumbai",
              "Bangalore",
              "Hyderabad",
              "Ahmedabad",
              "Chennai",
              "Kolkata",
              "Noida",
              "Ghaziabad",
              "Faridabad",
              "Surat",
              "Pune",
              "Jaipur",
              "Lucknow",
              "Kanpur",
              "Thane",
              "Patna",
              "Indore",
              "Bhopal",
              "Ranchi",
              "Greater Noida",
              "Meerut",
              "Varanasi",
              "Allahabad",
              "Prayagraj",
              "Chandigarh"].map((item,index) => (
                <a
                  key={index}
                  title={`${item.toLowerCase().replace(/\s+/g, "-")} ro  Services`}
                  href={`/ro/ro-water-purifier-service-${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className=" text-white px-3 py-1  text-sm hover:text-yellow-300 transition"
                >
                  {item}
                </a>
              ))}
          </div>
        </div>
        {/* ac Service Popular Cities */}
        <div>
          <StateLinks />
        </div>

        {/* Contact Info */}
        <div className=" contact-footer-style ">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm leading-relaxed">
            Unit No. 831, 8th Floor, JMD Megapolis,
            Sohna Road, Sector-48, Gurugram, Haryana 122018
            </p>

          </div>
          <div className="flex space-x-3 socialLinks">
          {/* https://www.facebook.com/MrServiceExpert/  className="w-10 h-10"  */}
          <a href="https://www.facebook.com/ACCareIndia/" target='_blank' rel="noopener noreferrer" title="Facebook Ac Care Service" className="hover:text-yellow-400 transition text-xl"><img src="/assets/images/socialIcons/facebook logo.webp" alt="Facebook Ac Care Service"  title="Facebook Ac Care Service" height="auto" width={40} /></a>
            <a href="https://x.com/accareindia" target='_blank' rel="noopener noreferrer" title="twitter Ac Care Service" className="hover:text-yellow-400 transition text-xl"><img src="/assets/images/socialIcons/twitter logo.webp" alt="twitter Ac Care Service" title="twitter Ac Care Service"   height="auto" width={40} /></a>
            <a href="https://www.instagram.com/accareindia/" target='_blank' rel="noopener noreferrer" title="Instagram Ac Care Service" className="hover:text-yellow-400 transition text-xl"><img src="/assets/images/socialIcons/insta.svg" alt="Instagram Ac Care Service" height="auto" width={40} /></a>
            <a href="https://www.linkedin.com/company/ac-care-india/" target='_blank' rel="noopener noreferrer" title="Linkedin Ac Care Service" className="hover:text-yellow-400 transition text-xl"><img src="/assets/images/socialIcons/linkedin logo.webp" alt="Linkedin Ac Care Service"  title="Linkedin mr service expert"  height="auto" width={40} /></a>
          </div>
        </div>

      </div>
      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm border-t border-gray-500 pt-6">
        © {new Date().getFullYear()} AC Care India |
        <a href="/" target='_blank' rel="noopener noreferrer" title="home" className="hover:text-yellow-400 transition mx-2">Home</a> |
        <a href="/terms-and-conditions" target='_blank' title="terms-and-conditions" rel="noopener noreferrer" className="hover:text-yellow-400 transition mx-2">Terms</a> |
        <a href="/privacy-and-policy" target='_blank' title="privacy-and-policy" rel="noopener noreferrer" className="hover:text-yellow-400 transition mx-2">Privacy Policy</a> |
        <a href="/contactus" target='_blank' rel="noopener  noreferrer" title="contact" className="hover:text-yellow-400 transition mx-2">Contact</a>|
        <a href="/careers" target='_blank' rel="noopener noreferrer" title="careers" className="hover:text-yellow-400 transition mx-2">Career</a>

      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="scrollUpBtn"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;