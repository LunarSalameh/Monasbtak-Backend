"use client"

import React, { useState, useEffect } from "react";
import "./page.css";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { OrbitProgress } from 'react-loading-indicators';


function Page() {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successDeletionAlert, setSuccessDeletionAlert] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noImagesMessage, setNoImagesMessage] = useState("");
  const [categoryImages, setCategoryImages] = useState([]);

  const handleFileChange = (event, categoryId) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      handleAddImage(categoryId, file);
    }
  };

  const handleSuccessAlert = () => {
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
      setImage(null);
    }, 2500);
  };

  const handleSuccessDeletionAlert = () => {
    setSuccessDeletionAlert(true);
    setTimeout(() => {
      setSuccessDeletionAlert(false);
      setImage(null);
    }, 2500);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNoImagesMessage("");
  };

  const handleImageClick = (index) => setCurrentImageIndex(index);
  const handleCloseImageModal = () => {
    setImage(null);
    setCurrentImageIndex(null);
  };

  // Fetch categories and images
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost/Monasbtak-Backend/php/api/planner/eventAlbum/getCategories.php`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.success) setCategories(data.categories);
        else throw new Error("Failed to fetch categories.");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Add image
  const handleAddImage = async (category_id, image) => {
    const urlParams = new URLSearchParams(window.location.search);
    const plannerId = urlParams.get("id");

    const formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("image", image);
    formData.append("planner_id", plannerId);

    try {
      const response = await fetch(
        "http://localhost/Monasbtak-Backend/php/api/planner/eventAlbum/postAlbum.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) handleSuccessAlert();
      else console.error("Failed to upload image:", result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch category data
  const fetchCategoryData = async (category_id) => {
    const urlParams = new URLSearchParams(window.location.search);
    const planner_id = urlParams.get("id");

    try {
      const response = await fetch(
        `http://localhost/Monasbtak-Backend/php/api/planner/eventAlbum/getAlbumByCategory.php?category_id=${category_id}&planner_id=${planner_id}`
      );
      const data = await response.json();

      if (data.success) {
        if (data.data.length > 0) {
          setCategoryImages(data.data);
          setNoImagesMessage("");
        } else {
          setNoImagesMessage("This planner has no photos for this category yet!");
          setCategoryImages([]);
        }
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  // Delete image
  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost/Monasbtak-Backend/php/api/planner/eventAlbum/deleteAlbum.php`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );

      const result = await response.json();
      if (result.success) {
        // Remove the deleted image from the local state
        handleSuccessDeletionAlert();
        setCategoryImages((prevImages) => prevImages.filter((img) => img.id !== id));
        console.log("Image deleted successfully");
      } else {
        console.error("Failed to delete image:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCategoryClick = (categoryId, categoryName) => {
    setName(categoryName);
    fetchCategoryData(categoryId);
    handleShowModal();
  };

  return (
    <div className="page-container">
      <div className="section-container">
        <div className="Planner-album-container" tabIndex="0">
          <div className="showall">
            <span className="large-font-size bold-font">Event Album</span>
          </div>
          <hr />
          {successAlert && (
            <div className="bg-green-200 border-green-800 border-2 rounded-lg text-green-800 px-2 py-1 text-center">
              Image Uploaded Successfully
            </div>
          )}

          {loading ? (
            <div className='flex w-full justify-center justify-items-center pt-6'>
              <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#D9B349" />
            </div>
          ) : (
              <div className="album-sections">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category.id} className="section">
                        <h3>{category.name}</h3>
                        {category.image && (
                          <div className="relative">
                            <img
                              src={`data:image/jpeg;base64,${category.image}`}
                              alt={category.name}
                              className="section-img cursor-pointer"
                              onClick={() => handleCategoryClick(category.id, category.name)}
                            />
                            <input
                              id={`file-input-${category.id}`}
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(event) => handleFileChange(event, category.id)}
                            />
                            <label htmlFor={`file-input-${category.id}`}>
                              <MdAddPhotoAlternate
                                className="absolute top-2 right-2 bg-[#5a5a5a8e] rounded-lg w-8 h-8 p-1"
                                color="white"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No categories found.</p>
                  )}
                </div>

          )}
         

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <button className="close-button" onClick={handleCloseModal}>
                  <IoClose />
                </button>
                <div className="bold-font large-font-size text-center">{name}</div>
                <hr className="line" />
                <div className="modal-content">
                  <div className="Modal-Album-container">
                    {categoryImages.length > 0 ? (
                      categoryImages.map((image) => (
                        <div className="Modal-Album-img-container relative" key={image.id}>
                          <img
                            src={`data:image/jpeg;base64,${image.image}`}
                            className="Album-img"
                            alt="Album"
                            onClick={() => handleImageClick(image.id)}
                            
                          />
                          {console.log(image.id)}
                          <MdDelete
                            className="absolute top-2 right-2 bg-[#5a5a5a8e] rounded-lg w-8 h-8 p-1"
                            color="white"
                            onClick={() => handleDeleteImage(image.id)}
                          />
                        </div>
                      ))
                    ) : (
                      <p>{noImagesMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

           {/* Success Alert */}
           {successAlert && (
            <div className="modal-overlay-status">
              <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                <div className="bg-green-600 p-0 rounded-l-xl"></div>
                <div className="p-5 bg-white border-2 border-green-600">Image Uploaded Successfully</div>
              </div>
            </div>
          )}

           {/* Success Alert */}
           {successDeletionAlert && (
            <div className="modal-overlay-status">
              <div className="rounded-xl w-fit grid grid-cols-[0.25fr,1fr]">
                <div className="bg-green-600 p-0 rounded-l-xl"></div>
                <div className="p-5 bg-white border-2 border-green-600">Image Deleted Successfully</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
