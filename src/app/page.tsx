"use client";
import SidePanel from "@/components/SidePanel";
import { BACKGROUND_OPTIONS } from "@/data/backgrounds";
import { sizes } from "@/data/sizes";
import { useSettingStore } from "@/_store";

export default function Home():any {
  const { bg, size, authorImage, authorName, textColor, Title , designation } =
    useSettingStore((state) => state);
  const selectedBg = BACKGROUND_OPTIONS.find((option) => option.name === bg);
  const selectedSize:any = sizes.find((option) => option.label === size);

  // Calculate the display dimensions for the SVG
  const displayWidth = 1200; // Fixed display width
  const displayHeight =
    (selectedSize.height / selectedSize.width) * displayWidth; // Maintain aspect ratio


    
  return (
    <div className="grid grid-cols-12 gap-4 w-full items-center px-10">
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
            <div className="w-full h-full">
              {selectedBg?.component}
            </div>
          </foreignObject>

          {/* Author Details */}
          {authorImage && (
            <g>
              <clipPath id="roundedRectClip">
                <rect
                  x="50"
                  y={selectedSize?.height - 150}
                  width="80"
                  height="80"
                  rx="20"
                  ry="20"
                />
              </clipPath>
              <image
                href={authorImage}
                x="50"
                y={selectedSize?.height - 150}
                width="80"
                height="80"
                clipPath="url(#roundedRectClip)"
              />
            </g>
          )}
          {Title && (
            <text
              x="50"
              y="100"
              fontSize="40"
              className=" font-bold text-white"
              fill={textColor}
            >
              {Title.split('\n').map((line, index) => (
                <tspan key={index} x="50" dy={index === 0 ? 0 : "1.2em"}>
                  {line}
                </tspan>
              ))}
            </text>
          )}
          {/* Author Name */}
          {authorName && (
            <text
              x="160" // Adjust horizontal position
              y={selectedSize?.height - 100} // Adjust vertical position relative to bottom
              fontSize="24"
              className=" font-bold text-white"
              fill={textColor}
            >
              {authorName}
            </text>
          )}

           {/* designation Name */}
           {designation && (
            <text
              x="160" 
              y={selectedSize?.height - 80} 
              fontSize="20"
              className=" font-bold text-white"
              fill={textColor}
            >
              {designation}
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
