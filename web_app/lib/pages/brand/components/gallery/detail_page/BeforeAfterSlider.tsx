import React from "react";
import Image from "next/image";
import { BeforeAfter } from "../../../types";
import { BeforeAfterSliderProps } from "../../../types/gallery";

export default function BeforeAfterSlider({
  transformation,
  beforeImages,
  afterImages,
  selectedBeforeIndex,
  selectedAfterIndex,
  sliderPosition,
  isSliding,
  setIsSliding,
  handleSliderMove
}: BeforeAfterSliderProps) {
  // Check if we have valid images
  if (!beforeImages || beforeImages.length === 0 || !afterImages || afterImages.length === 0) {
    return (
      <div className="relative w-full mb-12">
        <div className="relative w-full max-w-[1920px] mx-auto h-[600px] lg:h-[800px] bg-gray-100 flex items-center justify-center rounded-lg shadow-lg">
          <p className="text-gray-500 text-lg">No before/after images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mb-12">
      {/* Before/After Slider */}
      <div 
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden shadow-2xl cursor-ew-resize"
        onMouseDown={() => setIsSliding(true)}
        onMouseUp={() => setIsSliding(false)}
        onMouseLeave={() => setIsSliding(false)}
        onMouseMove={handleSliderMove}
      >
        {/* Before Image */}
        <div className="relative h-[600px] lg:h-[800px] w-full">
          <Image
            src={beforeImages[selectedBeforeIndex]}
            alt={transformation.beforeImageAlt || `Before ${transformation.treatmentType}`}
            fill
            className="object-cover"
            draggable={false}
            priority
          />
          
          {/* After Image Overlay */}
          <div 
            className="absolute top-0 right-0 h-full overflow-hidden"
            style={{ width: `${100 - sliderPosition}%` }}
          >
            <div className="relative h-full" style={{ width: `${(100 / (100 - sliderPosition)) * 100}%` }}>
              <Image
                src={afterImages[selectedAfterIndex]}
                alt={transformation.afterImageAlt || `After ${transformation.treatmentType}`}
                fill
                className="object-cover object-right"
                draggable={false}
                priority
              />
            </div>
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 h-full w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded">
            After
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">
        Drag the slider to compare before and after
      </p>
    </div>
  );
}