"use client";
import { useEffect, useState } from "react";
import SidePanel from "@/components/SidePanel";
import { BACKGROUND_OPTIONS } from "@/data/backgrounds";
import { sizes } from "@/data/sizes";
import { useSettingStore } from "@/_store";

export default function Home() {
  const { bg, size, authorImage, authorName, textColor, Title , setSvgRef , svgRef } =
    useSettingStore((state) => state);
  const selectedBg = BACKGROUND_OPTIONS.find((option) => option.name === bg);
  const selectedSize = sizes.find((option) => option.label === size);

  // Calculate the display dimensions for the SVG
  const displayWidth = 1200; // Fixed display width
  const displayHeight =
    (selectedSize.height / selectedSize.width) * displayWidth; // Maintain aspect ratio


    
  return (
    <div className="grid grid-cols-12 gap-4 w-full mt-5 items-center px-10">
      <div className="screen grid grid-cols-7 col-span-12 md:col-span-8">
        <svg
          className="mainSvg"
          width={displayWidth} // Larger display width
          height={displayHeight}
          viewBox={`0 0 ${selectedSize?.width} ${selectedSize?.height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full">
              {selectedBg?.component}
            </div>
          </foreignObject>

          {/* Author Details */}
          {authorImage && (
            <g>
              <clipPath id="roundedRectClip">
                <rect
                  x="20"
                  y={selectedSize?.height - 100}
                  width="80"
                  height="80"
                  rx="20"
                  ry="20"
                />
              </clipPath>
              <image
                href={authorImage}
                x="20"
                y={selectedSize?.height - 100}
                width="80"
                height="80"
                clipPath="url(#roundedRectClip)"
              />
            </g>
          )}
          {Title && (
            <text
              x="30"
              y="70"
              fontSize="30"
              className=" font-bold text-white"
              fill={textColor}
            >
              {Title}
            </text>
          )}
          {/* Author Name */}
          {authorName && (
            <text
              x="120" // Adjust horizontal position
              y={selectedSize?.height - 50} // Adjust vertical position relative to bottom
              fontSize="24"
              className=" font-bold text-white"
              fill={textColor}
            >
              {authorName}
            </text>
          )}
        </svg>
      </div>
      <div className="sidepanel grid col-span-12 md:col-span-4 justify-end">
        <SidePanel/>
      </div>
    </div>
  );
}
