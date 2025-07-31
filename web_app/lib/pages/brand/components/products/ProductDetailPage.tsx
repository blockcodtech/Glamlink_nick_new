"use client";

import BreadcrumbNav from "../shared/BreadcrumbNav";
import BackToListButton from "../shared/BackToListButton";
import BeforeAfterGallerySection from "@/lib/components/BeforeAfterGallerySection";
import { useProductDetailPage } from "../../hooks/products/useProductDetailPage";
import ProductImageGallery from "./detail_page/ProductImageGallery";
import ProductInfo from "./detail_page/ProductInfo";
import ProductDetails from "./detail_page/ProductDetails";
import ProductActions from "./detail_page/ProductActions";
import ProductReviews from "./detail_page/ProductReviews";
import RelatedProducts from "./detail_page/RelatedProducts";

interface ProductDetailPageProps {
  brandId: string;
  productId: string;
}

export default function ProductDetailPage({ brandId, productId }: ProductDetailPageProps) {
  const {
    product,
    brand,
    relatedProducts,
    productReviews,
    isLoading,
    selectedImage,
    quantity,
    averageRating,
    productImages,
    setSelectedImage,
    handleQuantityChange,
    handleAddToCart,
    handleNavigateToRelatedProduct
  } = useProductDetailPage(brandId, productId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product || !brand) {
    return null;
  }

  // Calculate total reviews
  const totalReviews = productReviews.length;
  
  // Get image alt texts
  const imageAlts = product.imagesAlt && product.imagesAlt.length > 0
    ? [product.imageAlt || product.name, ...product.imagesAlt]
    : [product.imageAlt || product.name];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <BreadcrumbNav
          items={[
            { label: "Brands", href: "/brand" },
            { label: brand.name, href: `/brand/${brandId}` },
            { label: "Products", href: `/brand/${brandId}/products` },
            { label: product.name }
          ]}
        />

        {/* Back Button */}
        <BackToListButton label="Back to Products" />

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ProductImageGallery
            productImages={productImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            imageAlts={imageAlts}
          />

          {/* Product Info */}
          <div>
            <ProductInfo
              product={product}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />

            <ProductDetails product={product} />

            <ProductActions
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>

        <ProductReviews productReviews={productReviews} />

        {/* Before & After Gallery */}
        {(product.beforeImagePrimary || product.afterImagePrimary) && (
          <div className="mt-16">
            <BeforeAfterGallerySection
              beforeImagePrimary={product.beforeImagePrimary}
              beforeImages={product.beforeImages}
              afterImagePrimary={product.afterImagePrimary}
              afterImages={product.afterImages}
              productName={product.name}
            />
          </div>
        )}

        <RelatedProducts
          relatedProducts={relatedProducts}
          handleNavigateToRelatedProduct={handleNavigateToRelatedProduct}
        />
      </div>
    </div>
  );
}