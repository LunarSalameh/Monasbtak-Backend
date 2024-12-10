"use client";
import { useState, useEffect } from "react";
import stl from "./slider.module.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  const next = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000); // Change slide every second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide]);

  return (
    <div className={stl.slider}>
      <div className={stl.btns}>
        <img src='/right-arrow.png' className={stl.prev} onClick={next} />
        <img src='/left-arrow.png' className={stl.nxt} onClick={prev} />
      </div>
      <div className={"slide"}>
        {images.length > 0 && (
          <img src={`data:image/jpeg;base64,${images[currentSlide].image}`} alt="" className={stl.imgs} />
        )}
      </div>
    </div>
  );
};
export default Slider;
