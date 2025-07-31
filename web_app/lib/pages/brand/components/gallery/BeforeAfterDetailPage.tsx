"use client";

import BreadcrumbNav from "../shared/BreadcrumbNav";
import BackToListButton from "../shared/BackToListButton";
import { useBeforeAfterDetailPage } from "../../hooks/gallery/useBeforeAfterDetailPage";
import BeforeAfterSlider from "./detail_page/BeforeAfterSlider";
import ImageGalleries from "./detail_page/ImageGalleries";
import TransformationDetails from "./detail_page/TransformationDetails";
import TransformationSidebar from "./detail_page/TransformationSidebar";

import { BeforeAfterDetailPageProps } from "../../types/gallery";

export default function BeforeAfterDetailPage({ brandId, transformationId }: BeforeAfterDetailPageProps) {
  const {
    transformation,
    brand,
    provider,
    products,
    isLoading,
    sliderPosition,
    isSliding,
    selectedBeforeIndex,
    selectedAfterIndex,
    beforeImages,
    afterImages,
    setIsSliding,
    handleSliderMove,
    setSelectedBeforeIndex,
    setSelectedAfterIndex,
    handleNavigateToProduct,
    handleNavigateToProvider
  } = useBeforeAfterDetailPage(brandId, transformationId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transformation || !brand) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <BreadcrumbNav
          items={[
            { label: "Brands", href: "/brand" },
            { label: brand.name, href: `/brand/${brandId}` },
            { label: "Gallery", href: `/brand/${brandId}` },
            { label: transformation.treatmentType }
          ]}
        />

        {/* Back Button */}
        <BackToListButton label="Back to Gallery" />

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{transformation.treatmentType}</h1>
          <p className="text-xl text-gray-600">Duration: {transformation.duration}</p>
        </div>
      </div>

      {/* Full-Width Slider Section */}
      <BeforeAfterSlider
        transformation={transformation}
        beforeImages={beforeImages}
        afterImages={afterImages}
        selectedBeforeIndex={selectedBeforeIndex}
        selectedAfterIndex={selectedAfterIndex}
        sliderPosition={sliderPosition}
        isSliding={isSliding}
        setIsSliding={setIsSliding}
        handleSliderMove={handleSliderMove}
      />

      {/* Image Galleries */}
      <div className="container-custom mb-12">
        <ImageGalleries
          beforeImages={beforeImages}
          afterImages={afterImages}
          selectedBeforeIndex={selectedBeforeIndex}
          selectedAfterIndex={selectedAfterIndex}
          setSelectedBeforeIndex={setSelectedBeforeIndex}
          setSelectedAfterIndex={setSelectedAfterIndex}
        />

        {/* Transformation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <TransformationDetails
            transformation={transformation}
            products={products}
            handleNavigateToProduct={handleNavigateToProduct}
          />
          
          <TransformationSidebar
            transformation={transformation}
            provider={provider}
            brand={brand}
            handleNavigateToProvider={handleNavigateToProvider}
          />
        </div>
      </div>
    </div>
  );
}