import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slideshow-container">
            {images.map((images, index) => (
                <div className={`slide ${index === currentIndex ? "active" : ""}`} key={index}>
                    <img src={images.src} alt={`Slide ${index + 1}`} />
                    <div className="slide-text">{images.text}</div>
                </div>
            ))}
        </div>
    )
}

export default Slideshow;