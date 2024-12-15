"use client";

import React, { useState, useEffect } from "react";
import "./page.css";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { OrbitProgress } from 'react-loading-indicators';

function PlannerAlbum() {
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

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setImage(categoryImages[index]);
    handleShowModal();
  };

  const handleCloseImageModal = () => {
    setCurrentImageIndex(null);
    // setImage(null);
    // setCurrentImageIndex(null);
  };

  // Fetch categories and images
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://monasbtak.org/php/api/planner/eventAlbum/getCategories.php`
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

  // Fetch category data
  const fetchCategoryData = async (category_id) => {
    const urlParams = new URLSearchParams(window.location.search);
    const planner_id = urlParams.get("planner_id");

    try {
      const response = await fetch(
        `http://monasbtak.org/php/api/planner/eventAlbum/getAlbumByCategory.php?category_id=${category_id}&planner_id=${planner_id}`
      );
      const data = await response.json();

      if (data.success) {
        if (data.data.length > 0) {
          setCategoryImages(data.data);
          console.log(data.data)
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

  const handleCategoryClick = (categoryId, categoryName) => {
    setName(categoryName);
    fetchCategoryData(categoryId);
    handleShowModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCurrentImageIndex((currentImageIndex + 1) % categoryImages.length);
    } else if (event.key === 'ArrowLeft') {
      setCurrentImageIndex((currentImageIndex - 1 + categoryImages.length) % categoryImages.length);
    }
  };

  useEffect(() => {
    if (currentImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, categoryImages.length]);


  return (
    <div className="event-album-container">
      <div className="">
          <div className="Planner-album-container" tabIndex="0">
            <span className="XL-font-size font-color bold-font">Event Album</span>
          <hr  className="line"/>

        {loading ? (
            <div className='flex w-full justify-center justify-items-center'>
                <OrbitProgress variant="track-disc" speedPlus="1" easing="linear" color="#4C1B41" />
              </div>
            ):(
              <div className="album-sections">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category.id} className="section">
                        <h3>{category.name}</h3>
                        {category.image && (
                          <div>
                            <img
                              src={`data:image/jpeg;base64,${category.image}`}
                              alt={category.name}
                              className="section-img cursor-pointer"
                              onClick={() => handleCategoryClick(category.id, category.name)}
                            />

                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No categories found.</p>
                  )}
                </div>
            ) }
          

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <button className="close-button" onClick={handleCloseModal}>
                  <IoClose />
                </button>
                <div className="XL-font-size font-color bold-font text-center">{name}</div>
                <hr className="line" />
                <div className="modal-content">
                  <div className="Modal-Album-container">
                    {categoryImages.length > 0 ? (
                      categoryImages.map((image, index) => (
                        <div className="Modal-Album-img-container relative" key={image.id}>
                          <img
                            src={`data:image/jpeg;base64,${image.image}`}
                            className="Album-img"
                            alt="Album"
                            onClick={() => handleImageClick(index)}
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

{currentImageIndex !== null && (
  <div className="image-modal-overlay">
    <div className="image-modal">
      <button className="close-button" onClick={handleCloseImageModal}>
        <IoClose />
      </button>
      <button
        className="prev-button"
        onClick={() =>
          setCurrentImageIndex((currentImageIndex - 1 + categoryImages.length) % categoryImages.length)
        }
      >
        <IoIosArrowBack />
      </button>
          <img
                  src={`data:image/jpeg;base64,${categoryImages[currentImageIndex]?.image}`}
                  className="full-size-img"
                  alt="Album Image"
                />
              <button
                className="next-button"
                onClick={() =>
                  setCurrentImageIndex((currentImageIndex + 1) % categoryImages.length)
                }
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}

export default PlannerAlbum