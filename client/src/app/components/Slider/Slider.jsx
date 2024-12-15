"use client";
import { useState, useEffect } from "react";
import stl from "./slider.module.css";
import { useSearchParams } from "next/navigation";
import { IoCalendar } from "react-icons/io5";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const next = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(
        "http://localhost/Monasbtak-Backend/php/api/admin/slider/getImages.php"
      );
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        // Prepend fixed slide to the array
        const fixedSlide = {
          type: "fixed", // Custom property to identify the fixed slide
          title: "Welcome to Our Platform",
          description: "Create the perfect event with ease. Monasbtak brings together expert planners, vendors, and everything you need to make your event unforgettable.",
          buttonText: "Start Your Booking",
          buttonLink: "#categories",
          image: "/landingPageBG.jpg", // Path to the fixed image
        };
        setImages([fixedSlide, ...data.data]);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide]);

  return (
    <div className={stl.slider}>
      <div className={stl.btns}>
        <img
          src="/right-arrow.png"
          className={stl.prev}
          onClick={next}
          alt="Next"
        />
        <img
          src="/left-arrow.png"
          className={stl.nxt}
          onClick={prev}
          alt="Previous"
        />
      </div>

      <div className="w-full ">
        {images.length > 0 && (
          <div className={stl.containerImg}>
            {images[currentSlide].type === "fixed" ? (
              // Fixed Slide Content
              <div
                className={stl.fixedSlide}
                style={{
                  backgroundImage: `url(${images[currentSlide].image})`,
                  backgroundAttachment: "fixed",
                  height: "500px",
                }}
              >
                <div className={stl.textContainer}>
                  <h1 className={stl.title}>
                    {/* <img src="/Golden-logo.png" /> */}
                    <IoCalendar  size={200} color="#D9B34D"/>
                  </h1>
                  
                  <div className="w-2/4 flex flex-col justify-around">
                      <p className={stl.description}>
                      {images[currentSlide].description}
                    </p>
                    <div className="flex justify-center items-center">
                      <a
                        href={images[currentSlide].buttonLink}
                        className={stl.actionBtn}
                      >
                        {images[currentSlide].buttonText}
                      </a>
                    </div>
                    </div>
                </div>
              </div>
            ) : (
              // Dynamic Slide Content
              // data:image/jpeg;base64,${images[currentSlide].image}
              <div
                style={{
                  backgroundImage: `url(data:image/jpeg;base64,${images[currentSlide].image})`,
                  
                }}
                className={stl.imgs}
              >
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
