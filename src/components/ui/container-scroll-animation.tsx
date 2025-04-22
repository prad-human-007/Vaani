"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // --- CORRECTION ---
  // Add the 'offset' option to track scroll relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animation when the top of the container hits the bottom of the viewport
    // End animation when the bottom of the container hits the top of the viewport
    // You can adjust these values (e.g., "start center", "end center") to change when the animation occurs
    offset: ["start end", "end start"],
  });
  // --- END CORRECTION ---

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Input range [0, 1] corresponds to the scroll progress defined by 'offset'
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]); // Rotate from 20deg to 0deg
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]); // Translate Y from 0 to -100

  return (
    // Ensure the container has enough height for scroll triggering,
    // or rely solely on the offset calculation relative to the viewport.
    // min-h-screen might be enough if the content inside pushes it beyond viewport height,
    // otherwise, you might need a larger height like h-[150vh] or h-[200vh]
    // depending on when you want the scroll effect to happen relative to page scroll.
    // However, with the offset defined, min-h-screen should work correctly
    // as long as the page itself is scrollable.
    <div
      className="flex items-center justify-center relative min-h-screen"
      ref={containerRef}
    >
      <div
        className="py-4 w-full relative" // Increased padding for better scroll range visibiliy
        style={{
          perspective: "1000px", // Perspective needed for rotateX
        }}
      >
        {/* Header moves up slightly */}
        <Header translate={translate} titleComponent={titleComponent} />
        {/* Card rotates, scales, and moves up */}
        <Card
          rotate={rotate}
          translate={translate} // Apply the same translate Y as the header? Or maybe a different one? Check your desired effect. Keep as is for now.
          scale={scale}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

// Header Component remains the same
export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate, // Header also translates up
      }}
      className="div max-w-5xl mx-auto text-center mb-10 md:mb-20" // Added margin-bottom
    >
      {titleComponent}
    </motion.div>
  );
};

// Card Component - Beam logic might need adjustment based on desired effect,
// but the core rotation/scale/translate props are now driven correctly.
export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  const [beamPosition, setBeamPosition] = useState(0);

  // Define relative dimensions for perimeter calculation
  // These percentages represent the path length, not necessarily exact visual aspect ratio,
  // but influence the speed on each side. Let's assume width is dominant.
  const widthPercent = 100;
  // Based on h-[40rem] vs max-w-5xl (~80rem wide), height is roughly 50% of width path length
  const heightPercent = 50;
  const perimeter = 2 * (widthPercent + heightPercent);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment position, looping back around the perimeter
      setBeamPosition((prev) => (prev + 1) % perimeter);
    }, 15); // Adjust interval for speed (lower means faster)

    return () => clearInterval(interval);
  }, [perimeter]); // Dependency array includes perimeter

  // Calculate beam CSS styles based on its position along the perimeter
  const getBeamStyles = () => {
    let currentPosition = beamPosition;
    let top = 0;
    let left = 0;

    // Beam dimensions (adjust size as needed)
    const beamSize = 10; // size in pixels
    const halfBeamSize = beamSize / 2;

    // Determine position based on perimeter segments (Clockwise)
    if (currentPosition < widthPercent) {
      // ---- Top Edge (Left to Right) ----
      top = 0;
      left = (currentPosition / widthPercent) * 100;
    } else if (currentPosition < widthPercent + heightPercent) {
      // ---- Right Edge (Top to Bottom) ----
      currentPosition -= widthPercent;
      top = (currentPosition / heightPercent) * 100;
      left = 100;
    } else if (currentPosition < widthPercent + heightPercent + widthPercent) {
      // ---- Bottom Edge (Right to Left) ----
      currentPosition -= widthPercent + heightPercent;
      top = 100;
      left = 100 - (currentPosition / widthPercent) * 100; // Move right-to-left
    } else {
      // ---- Left Edge (Bottom to Top) ----
      currentPosition -= widthPercent + heightPercent + widthPercent;
      top = 100 - (currentPosition / heightPercent) * 100; // Move bottom-to-top
      left = 0;
    }

    // CSS properties for the beam
    const style: React.CSSProperties = {
      position: "absolute",
      top: `${top}%`, // Position top-left corner based on calculated percentages
      left: `${left}%`, // Position top-left corner based on calculated percentages
      width: `${beamSize}px`,
      height: `${beamSize}px`,
      backgroundColor: "white",
      borderRadius: "50%", // Make it circular
      // Use transform to offset the beam so its *center* is on the border line
      transform: `translate(-${halfBeamSize}px, -${halfBeamSize}px)`,
      filter: "blur(4px)", // Adjust blur intensity
      boxShadow: "0 0 12px 4px rgba(255, 255, 255, 0.8)", // Adjust glow
      zIndex: 10, // Ensure it's above the card content's background
      pointerEvents: "none", // Prevent it from interfering with mouse events
    };

    return style;
  };

  return (
    // Outer div to establish positioning context if needed, but the main motion.div already has it.
    // max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full is the boundary
    <motion.div
      style={{
        perspective: "1000px", // Perspective for the 3D rotation effect
      }}
      // This div defines the coordinate system (0% to 100% top/left) for the absolute beam
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full relative"
    >
      {/* The rotating, scaling, translating card */}
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          translateY: translate,
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          // Ensure 3D transformations are preserved for children (including the beam)
          transformStyle: "preserve-3d",
        }}
        // This div also needs `position: relative` if the beam is inside it,
        // OR the beam can be a sibling positioned relative to the outer `motion.div`
        className="h-full w-full bg-black rounded-[30px] shadow-2xl overflow-hidden relative" // Added relative here too
      >
        {/* Inner container for content */}
        <div className="h-full w-full overflow-hidden rounded-[30px] bg-gray-900 dark:bg-zinc-900 md:p-1">
          {children}
        </div>

        {/* Moving beam element */}
        <motion.div
          className="beam-element" // Add a class for potential debugging/styling
          style={getBeamStyles()} // Apply the calculated styles
        />
      </motion.div>
    </motion.div>
  );
};
