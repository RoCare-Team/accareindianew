'use client'

import { faEye, faStar } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import { useParams } from 'next/navigation';

function page() {

 const [productdetails, setProductdetails] = useState([]);
 
   const params = useParams();
  const slug = params.cat; 
  const id = slug; 
  console.log("procoocid"  + id);
  
useEffect(() => {
    const getproductdata = async () => {
        try {
            const leadTypeCollection = collection(db, "product");
            const q = query(leadTypeCollection,where("id", "==",id));
            const snapshot = await getDocs(q);

            const subServicesData = snapshot.docs.map((doc) => doc.data());
            console.log("Fetched data:", subServicesData); // Check this in console

            setProductdetails(subServicesData); // Set array directly
        } catch (err) {
            console.error("Error fetching sub-services:", err);  
            setProductdetails([]); // fallback to empty array
        }
    };
    getproductdata();
    
}, []);
console.log(productdetails);


    return (

        <div className='px-32 py-4 relative'>

               <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
             <div className='text-center p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-400'>
                    <h1 className='text-4xl font-bold text-blue-800 mb-4'>Coming Soon</h1>
                    <p className='text-blue-600'>We're working hard to bring you this page!</p>
                </div>
            </div>


          <div>
              <div className='flex flex-row items-center mb-3 gap-2'>
                <span className='text-xs text-gray-500'>Home</span><span className='text-gray-400'>{`${'>'}`}</span><span className='text-xs text-gray-500'>spare parts</span> <span className='text-gray-400'>{`${'>'}`}</span> <span className='text-xs text-black font-bold'>{productdetails[0]?.product_name}</span>
            </div>
            {/* product image and description thing*/}
            <div className=' flex gap-4  bg-white p-4  mb-3 rounded-2xl'>
                <div className=' w-[35%] '>
                    <img src={`/img/products/${productdetails[0]?.product_image}`} alt="" />

                </div>
                <div className='w-[65%] p-2 flex flex-col gap-2 items-start'>
                    <span className='bg-blue-50 text-xs mb-3  text-blue-600 rounded-lg py-1 px-2'>Brand name</span>
                    <h3 className='text-xl font-bold mb-3'>{productdetails[0]?.product_name}</h3>
                    <div className='flex items-center mb-2'>
                        <span className='text-orange-400 text-xs'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-orange-400 text-xs'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-orange-400 text-xs'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-orange-400 text-xs'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-xs text-gray-400'>4.5 (328 reviews)</span>

                    </div>

                    <div className='flex gap-2 mb-2 items-center'>
                        {/* $1,299.99$999.99 */}
                        <span className='text-red-500 line-through '>₹ {productdetails[0]?.product_del_price}</span>
                        <span className='text-blue-600 font-bold text-xl'>₹ {productdetails[0]?.product_price}</span>
                        <span className='bg-green-50 text-xs text-green-600 rounded-lg py-1 px-2'>Save {productdetails[0]?.product_del_price-productdetails[0]?.product_price}</span>
                    </div>

                    <div className='bg-blue-50 text-xs mb-4 text-blue-600 flex flex-col gap-2  rounded-lg py-1 px-2'>
                        <span>EMI starts at $83.33/month. No Cost EMI available on select cards.</span>
                        <span>Free delivery available. Usually ships in 2-3 business days.</span>
                    </div>
                    <div className='w-full mb-3 flex flex-col gap-3'>
                        <h3 className='text-xs text-gray-500 font-bold mb-2'> Capacity</h3>
                        <div className="flex gap-2">
                            <button className='bg-gray-100 py-2 px-4 rounded-xl hover:bg-blue-300 hover:text-blue-600'>1 ton</button>
                            <button className='bg-gray-100 py-2 px-4 rounded-xl hover:bg-blue-300 hover:text-blue-600'>1.5 ton</button>
                            <button className='bg-gray-100 py-2 px-4 rounded-xl hover:bg-blue-300 hover:text-blue-600'>2 ton</button>
                        </div>

                        <span className='text-green-500 mb-3'>In Stock</span>

                        <div className='flex gap-2 w-full mb-3'>
                            <button className='bg-blue-600 p-2 rounded-xl text-white w-full flex-1'>Add To Cart</button>
                            <button className='bg-blue-600 p-2 rounded-xl text-white w-full flex-1'>Buy Now</button>
                        </div>
                    </div>


                </div>
            </div>

            <div className='bg-white rounded-2xl p-4 gap-2'>
                <div className='flex gap-2 border-b-1 border-b-gray-400 mb-3'><button className='bg-gray-100 p-2 rounded-xl mb-3 '>Description</button>
                    <button className='bg-gray-100 p-2 rounded-xl mb-3 '>Specification</button>
                    <button className='bg-gray-100 p-2 rounded-xl mb-3 '>Reviews</button></div>

                <div className='flex px-2 flex-col mb-3 '>

                    <div  dangerouslySetInnerHTML={{ __html: productdetails[0]?.fetures}}></div>






                </div>
            </div>
          </div>
        </div>
    )
}

export default page