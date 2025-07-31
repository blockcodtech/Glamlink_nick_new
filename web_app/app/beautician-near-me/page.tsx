"use client";

import Link from "next/link";
import { useState } from "react";

export default function BeauticianNearMePage() {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Find Beauticians Near You
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover certified beauty professionals in your area
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter your location or zip code..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-glamlink-teal text-lg"
                  />
                  <button className="px-8 py-4 bg-glamlink-teal text-white font-semibold rounded-full hover:bg-glamlink-teal-dark transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-blue-50 rounded-2xl p-12">
                <svg
                  className="w-16 h-16 text-blue-500 mx-auto mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Location-Based Search Coming Soon!
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  We're working on bringing you advanced location-based search to help you 
                  find the best beauty professionals in your neighborhood. This feature will 
                  include real-time availability, distance calculation, and map integration.
                </p>
                <p className="text-gray-600 mb-8">
                  In the meantime, you can browse all our certified providers by brand:
                </p>
                <Link
                  href="/brand"
                  className="inline-block px-8 py-3 bg-glamlink-teal text-white font-semibold rounded-full hover:bg-glamlink-teal-dark transition-colors"
                >
                  Browse All Brands
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
                What to Expect When We Launch
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">📍 Precise Location Search</h4>
                  <p className="text-gray-600">Find professionals within your preferred distance range</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">🗓️ Real-Time Availability</h4>
                  <p className="text-gray-600">See available appointment slots instantly</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">⭐ Verified Reviews</h4>
                  <p className="text-gray-600">Read authentic reviews from real clients</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">🏆 Certification Badges</h4>
                  <p className="text-gray-600">Easily identify certified professionals</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}