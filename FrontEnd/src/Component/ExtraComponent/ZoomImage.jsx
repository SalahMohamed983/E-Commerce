import React, { useRef, useState } from "react";

export default function ZoomImage({ src, alt }) {
  const containerRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  // Desktop - Mouse Move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setPosition({ x: "50%", y: "50%" });
  };

  // Mobile - Touch
  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
    setIsZoomed(true);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleTouchEnd = () => {
    setIsZoomed(false);
    setPosition({ x: "50%", y: "50%" });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden rounded-lg w-full h-full cursor-zoom-in"
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain transition-transform duration-300 ${
          isZoomed ? "scale-150" : "scale-100"
        }`}
        style={{
          transformOrigin: `${position.x} ${position.y}`,
        }}
      />
    </div>
  );
}
