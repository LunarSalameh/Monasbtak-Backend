"use client";

import './page.css'
import { RiDeleteBinLine } from "react-icons/ri";
import React,{ useState, useEffect } from "react";

import { GoUpload } from "react-icons/go";

export default function HomeScrollBar () {
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [acceptAlert, setAcceptAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);

    const openModal = (image) => {
        setShowModal(true);
        setImageToDelete(image);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/slider/getImages.php');
            const data = await response.json();
            if (data.status === 'success' && Array.isArray(data.data)) {
                setImages(data.data);
            } else {
                setImages([]);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setImages([]);
        }
    }

    const fetchDeleteImage = async (image) => {
        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/slider/deleteImage.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: image.id }),
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                fetchImages();
                setDeleteAlert(true);
                setTimeout(() => setDeleteAlert(false), 3000); 
            } else {
                console.error('Error deleting image:', data.message);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost/Monasbtak-Backend/php/api/admin/slider/addImage.php', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                fetchImages();
                setAcceptAlert(true);
                setTimeout(() => setAcceptAlert(false), 3000); 
            } else {
                console.error('Error uploading image:', data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return(
        <div className="PHS-container">
            <div className='HS-container'>
                <div className='HS-header'>
                    <span className='large-font-size bold-font max-lg:text-[24px] '>Home ScrollBar</span>
                </div>
                <hr className='HS-line'/>

                <div className='grid grid-cols-2 gap-5 max-h-[600px] overflow-y-scroll'>
                    {images.map((image, index) => (
                        <figure key={index} className='relative'>
                            <img className='rounded-xl h-full object-cover' src={`data:image/jpeg;base64,${image.image}`} alt={image.alt} />
                            <div
                                className="bg-[#5a5a5a8e] top-2 right-2 w-fit rounded-lg text-white p-2 absolute cursor-pointer"
                                onClick={() => openModal(image)}
                            >
                                <RiDeleteBinLine />
                            </div>
                        </figure>
                    ))}
                </div>

                <div className='flex w-full justify-end pt-8'>
                    <input 
                        type='file'
                        style={{ display: 'none' }}
                        id="file-input"
                        onChange={handleUpload}
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
                                    onClick={() => {
                                        fetchDeleteImage(imageToDelete);
                                        closeModal();
                                    }}
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
                {acceptAlert &&(
                    <div className="fixed top-4 right-4 modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                            <div className="bg-green-600 p-0 rounded-l-xl"></div>
                            <div className="p-5 bg-white border-2 border-green-600">Image Added Successfully</div>
                        </div>
                    </div>
                )}
                {deleteAlert &&(
                    <div className="fixed top-4 right-4 modal-overlay-status">
                        <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                            <div className="bg-green-600 p-0 rounded-l-xl"></div>
                            <div className="p-5 bg-white border-2 border-green-600">Image Deleted Successfully</div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}