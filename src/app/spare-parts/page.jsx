"use client"
import React, { useState, useEffect } from "react";
import Cart from '../components/cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
const acBrands = [
    { category: "LG Air Conditioner" },
    { category: "Lloyd Air Conditioner" },
    { category: "Voltas Air Conditioner" },
    { category: "Samsung Air Conditioner" },
    { category: "Hitachi Air Conditioner" },
    { category: "Carrier Air Conditioner" },
    { category: "Daikin Air Conditioner" },
    { category: "O General Air Conditioner" },
    { category: "Blue Star Air Conditioner" },
    { category: "Whirlpool Air Conditioner" },
    { category: "Panasonic Air Conditioner" },
    { category: "Onida Air Conditioner" },
    { category: "Haier Air Conditioner" },
    { category: "Godrej Air Conditioner" },
    { category: "Duct Air Conditioning" },
    { category: "Portable Air Conditioning" },
    { category: "Central Air Conditioner" },
    { category: "Smart Air Conditioner" }
];

const products = [
    {
        productId: 1,
        productName: "Arctic Breeze 12000 BTU Window Air Conditioner",
        productInfo: "Powerful cooling solution designed for medium-sized rooms up to 550 sq. ft. It offers three cooling modes (cool, dry, fan) and three fan speeds (low, medium, high), allowing you to customize your comfort.",
        productPrice: "800",
        productType: "window",
    },
    {
        productId: 2,
        productName: "CoolMaster 1.5 Ton Split AC",
        productInfo: "High-efficiency split AC with inverter technology for energy savings and silent operation. Suitable for rooms up to 180 sq. ft.",
        productPrice: "34000",
        productType: "split",
    },
    {
        productId: 3,
        productName: "BreezeFlow Window AC 1 Ton",
        productInfo: "Compact and budget-friendly window AC ideal for small bedrooms or offices. Includes auto restart and anti-bacterial filter.",
        productPrice: "22000",
        productType: "window",
    },
    {
        productId: 4,
        productName: "GlacierPro 2 Ton Split Inverter AC",
        productInfo: "Heavy-duty AC built for large rooms or halls. Features dual inverter compressor and 4-way swing for uniform cooling.",
        productPrice: "48000",
        productType: "split",
    },
    {
        productId: 5,
        productName: "AirSense 1.2 Ton Window AC",
        productInfo: "Reliable window AC with copper condenser and turbo cooling mode for quick relief from summer heat.",
        productPrice: "26000",
        productType: "window",
    },
    {
        productId: 6,
        productName: "ChillMate 1.5 Ton 3-Star Split AC",
        productInfo: "Efficient and durable split AC with 3-star rating for optimized power usage. Features include PM2.5 filter and auto clean.",
        productPrice: "31000",
        productType: "split",
    },
    {
        productId: 7,
        productName: "FrostWind Window AC 1.5 Ton",
        productInfo: "Robust and economical window air conditioner with advanced airflow technology and low-noise operation.",
        productPrice: "27000",
        productType: "window",
    },
];

function page() {


    const [brandOpen, setbrandOpen] = useState([]);
    const [product, setProduct] = useState([]);
    const [priceSort, setPriceSort] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

useEffect(() => {
    const getmaincategory = async () => {
        try {
            const leadTypeCollection = collection(db, "main_cat");
            const q = query(leadTypeCollection);
            const snapshot = await getDocs(q);

            const subServicesData = snapshot.docs.map((doc) => doc.data());
            console.log("Fetched data:", subServicesData); // Check this in console

            setbrandOpen(subServicesData); // Set array directly
        } catch (err) {
            console.error("Error fetching sub-services:", err);
            setbrandOpen([]); // fallback to empty array
        }
    };

    const getproductdata = async () => {
        try {
            const leadTypeCollection = collection(db, "product");
            const q = query(leadTypeCollection,where("m_cat_id", "==", "2"),where("status","==","1"));
            const snapshot = await getDocs(q);

            const subServicesData = snapshot.docs.map((doc) => doc.data());
            console.log("Fetched data:", subServicesData); // Check this in console

            setProduct(subServicesData); // Set array directly
        } catch (err) {
            console.error("Error fetching sub-services:", err);
            setProduct([]); // fallback to empty array
        }
    };
    getproductdata();
    getmaincategory();
}, []);



    const sortHighToLow = () => {
        const sorted = [...product].sort((a, b) => b.product_price - a.product_price);
        setProduct(sorted);
    };

    const SortLowTOHigh = () => {
        const sortedd = [...product].sort((a, b) => a.product_price - b.product_price);
        setProduct(sortedd);
    };

    

    const resetFilter = () => {
        setProduct(products);
        setPriceSort("");
       
    }
console.log(product);

    return (
        <div className='py-4 px-12 flex-row flex '>
            <div className='w-1/5 shadow-md bg-white rounded-2xl flex flex-col p-4'>
                <div className='flex justify-between items-start w-full'>
                    <h2 className='mb-2 '><b>Air Conditioners</b></h2>
                    <span className='text-gray-500'></span>
                </div>
                 
                <div className='flex flex-col p-2 gap-3'>
                    <h2 className='text-gray-500'>Brands</h2>
                    <div className={`transition-all flex-col flex gap-2 rounded-xl bg-gray-200 p-2 duration-300  overflow-auto`}>
                     {Array.isArray(brandOpen) && brandOpen.length > 0 ? (
    brandOpen.map((brands, index) => (
        <div key={index}>
            <a href={`${brands.m_cat_link}`}>
            <button className='bg-purple-100 hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white text-black border-1 border-blue-600 rounded-2xl p-2 w-full text-xs'>
                {brands.m_cat_name}
            </button></a>
        </div>
    ))
) : (
    <p>No data found</p> // To see when data is empty
)}
                    </div>
                </div>
            </div>
            <div className='px-4 w-[80%]'>
                <div className='mb-2'><h2 className='text-xl mb-2'><b>Air Conditioners</b></h2>
                    <span className='text-gray-400 '>Discover our wide range of cooling solutions for your home or office</span></div>
                <div className='bg-white rounded-2xl px-4 py-2'>
                    <div className='flex justify-between mb-3'>
                        <span className='text-xs'><b>Sort By</b></span>
                        <span className='text-xs text-gray-600'>Showing {product.length} products</span>
                    </div>

                   <div className='flex justify-between items-center'>
                     <div className='flex flex-row gap-2'>
                        <select
                            value={priceSort} 
                            onChange={(e) => {
                                const value = e.target.value;
                                setPriceSort(value);
                                if (value === "highToLow") sortHighToLow();
                                if (value === "lowToHigh") SortLowTOHigh();
                            }}
                            className='bg-blue-200 hover:bg-blue-400 hover:text-white text-blue-700 text-xs rounded-xl p-2'
                        >
                            <option value="">Price Range</option>
                            <option value="highToLow">High To Low</option>
                            <option value="lowToHigh">Low To High</option>
                        </select>


                        <button className='bg-blue-200 text-blue-700   hover:bg-blue-400 hover:text-white  text-xs rounded-xl p-2'>Capacity</button></div>

                        <button onClick={resetFilter} className='bg-blue-200 text-blue-700   hover:bg-blue-400 hover:text-white  text-xs rounded-xl p-2'>Reset Filter</button>

                   </div>
                </div>
                <div className='px-4 pt-4'>
                 
                    <div className='grid grid-cols-3 gap-4'>
                        {product.map((product) => (
                        <a href={`${product.product_url}/${product.id}`}>
                            <div key={product.productId} className=' group w-80 flex flex-col justify-between gap-4 relative  hover:-translate-y-0.5 hover:shadow-md bg-white rounded-2xl'>
                                <img src={`/img/products/${product.product_image}`} alt="product img" className='h-40 rounded-xl bg-blue-200' />
                                <span className='bg-blue-50 text-xs text-blue-600 rounded-lg py-1 px-2 absolute top-1.5 right-4  opacity-0 group-hover:opacity-100 '>
                                    {/* eye */}
                                    <FontAwesomeIcon icon={faEye} />
                                </span>
                                <div className='flex flex-col p-2'>
                                    <h2 className='mb-2'>{product.product_name}</h2>
                                    {/* <span className='text-gray-400 text-xs mb-2'>{product.productInfo}</span> */}
                                    <div className='flex justify-between'>
                                        <span className='text-green-400 text-xs mb-2'>Reviews 1.5K</span>
                                    <span className='text-blue-600 mb-2'> Price: ₹{product.product_price}</span>
                                    </div>

                                    <div className='flex gap-2 mb-4'>
                                        <span className='bg-blue-50 text-xs text-blue-600 rounded-lg py-1 px-2'>
                                            5 star Rating
                                        </span>

                                          <span className='bg-green-50 text-xs text-green-600 rounded-lg py-1 px-2'>
                                           Low Power
                                        </span>

                                          <span className='bg-purple-50 text-xs text-purple-600 rounded-lg py-1 px-2'>
                                           Smart Control
                                        </span>
                                    </div>

                                    <button className='bg-blue-600 mb-2 text-white rounded-2xl p-2 w-full hover:-translate-y-0.5 '>View</button>
                                </div>
                            </div>
                            </a>
                        ))}  

                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default page