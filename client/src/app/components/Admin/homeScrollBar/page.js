"use client";

import './page.css'
import { RiDeleteBinLine } from "react-icons/ri";
import React,{ useState } from "react";

import { GoUpload } from "react-icons/go";

export default function HomeScrollBar () {
    const [showModal, setShowModal] = useState(false);

    
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return(
        <div className="PHS-container">
            <div className='HS-container'>
                <div className='HS-header'>
                    <span className='large-font-size bold-font max-lg:text-[24px] '>Home ScrollBar</span>
                </div>
                <hr className='HS-line'/>

                <div className='grid grid-cols-2 gap-5 '>
                    
                    <figure className='relative'>
                        <img className='rounded-xl h-full object-cover' src="/slider11.jpg"/>
                        <div
                            className="bg-[#5a5a5a8e] top-2 right-2 w-fit rounded-lg text-white p-2 absolute cursor-pointer"
                            onClick={() => openModal()}
                            >
                                <RiDeleteBinLine />
                        </div>
                    </figure>

                    <div className='cols-span-2 grid gap-5'>
                        <figure className='relative'>
                            <img className='rounded-xl' src="/slider22.jpg"/>
                            <div
                            className="bg-[#5a5a5a8e] top-2 right-2 w-fit rounded-lg text-white p-2 absolute cursor-pointer"
                            >
                                <RiDeleteBinLine />
                        </div>
                        </figure>

                        <figure className='relative'>
                            <img className='rounded-xl' src="/wedding.jpg"/>
                            <div
                            className="bg-[#5a5a5a8e] top-2 right-2 w-fit rounded-lg text-white p-2 absolute cursor-pointer"
                            >
                                <RiDeleteBinLine />
                        </div>
                        </figure>

                    </div>
                    
                </div>

                <div className='flex w-full justify-end pt-8'>
                    <input 
                        type='file'
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <label 
                        htmlFor="file-input" 
                        className='bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit flex items-center gap-2 justify-items-center px-5 py-3 rounded-lg text-white max-md:text-sm'>
                            Upload <GoUpload />
                    </label>
                 </div>

                 {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-[30%] p-5 rounded-lg text-center">
                            <p className="text-xl">Are you sure you want to delete this Photo?</p>
                            <div className="flex justify-center gap-3 mt-4">
                               <button
                                    className="bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white"
                                    onClick={closeModal}
                                >
                                    Delete
                                </button>

                                <button
                                    className="bg-[#d9b34d] hover:bg-[#d9b44dc1] w-fit px-3 py-1 rounded-lg text-white"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}