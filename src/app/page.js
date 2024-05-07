"use client";
import React, { useEffect } from "react";
import SwiperSlides from "../components/SwiperSlides";
import Typed from "typed.js";
export default function Home() {
  const el = React.useRef(null);

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Homepage";
    const typed = new Typed(el.current, {
      strings: ["Welcome To WBTPTA Amta West Circle's New Website."],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <div className="container my-5">
      <div className="my-3" style={{ height: "70px" }}>
        {window.screen.width < 780 ? (
          <span
            className="text-primary text-center fs-6 mb-3 web-message"
            ref={el}
          />
        ) : (
          <span
            className="text-primary text-center fs-3 mb-3 web-message"
            ref={el}
          />
        )}
      </div>

      <SwiperSlides />
    </div>
  );
}
