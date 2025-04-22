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
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="flex items-center justify-center relative min-h-screen"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-[80%] relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

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
  const totalLength = 2 * (100 + 40); // Approximation of perimeter based on top+bottom+left+right sides
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBeamPosition((prev) => (prev + 1) % totalLength);
    }, 20);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate beam position - this determines where on the border the light appears
  const getBeamStyles = () => {
    // Define border segments
    const topLength = 100;    // percentage width
    const rightLength = 40;   // percentage height 
    const bottomLength = 100; // percentage width
    const leftLength = 40;    // percentage height
    
    // Calculate which segment the beam is on
    let position = beamPosition % (topLength + rightLength + bottomLength + leftLength);
    let style = {};
    
    if (position < topLength) {
      // Top border
      style = {
        top: 0,
        left: `${position}%`,
        width: "10px",
        height: "4px"
      };
    } else if (position < topLength + rightLength) {
      // Right border
      position -= topLength;
      style = {
        top: `${position * (100/rightLength)}%`,
        right: 0,
        width: "4px",
        height: "10px"
      };
    } else if (position < topLength + rightLength + bottomLength) {
      // Bottom border
      position -= (topLength + rightLength);
      style = {
        bottom: 0,
        right: `${position}%`,
        width: "10px",
        height: "4px"
      };
    } else {
      // Left border
      position -= (topLength + rightLength + bottomLength);
      style = {
        bottom: `${position * (100/leftLength)}%`,
        left: 0,
        width: "4px",
        height: "10px"
      };
    }
    
    return style;
  };

  return (
    <div className="relative">
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          translateY: translate,
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full   bg-black rounded-[30px] shadow-2xl relative overflow-hidden"
      >
        <div className="h-full w-full overflow-hidden rounded-2xl bg-black-100 dark:bg-zinc-900 md:rounded-2xl md:p-1">
          {children}
        </div>
        
        {/* Moving beam element */}
        <motion.div
          className="absolute bg-white rounded-full z-10"
          style={{
            ...getBeamStyles(),
            filter: "blur(2px)",
            boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.8)"
          }}
        />
      </motion.div>
    </div>
  );
};