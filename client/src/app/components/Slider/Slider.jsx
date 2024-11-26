"use client";
import { useState, useEffect } from "react";
import stl from "./slider.module.css";

const Slider = () => {
  const slides = ['/slider2.png','/slider11.jpg'];
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

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
        <img src={slides[currentSlide]} alt="" className={stl.imgs} />
      </div>
    </div>
  );
};
export default Slider;
