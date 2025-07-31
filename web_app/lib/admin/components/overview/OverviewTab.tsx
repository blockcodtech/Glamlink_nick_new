"use client";

import { useState, useEffect } from "react";
import firestoreService from "@/lib/services/firebase/firestoreService";
import brandReadService from "@/lib/pages/brand/server/brandReadService";
import { Brand } from "@/lib/pages/brand/types";
import { useAuth } from "@/lib/auth/hooks/useAuth";

export default function OverviewTab() {
  const [stats, setStats] = useState({
    products: 0,
    providers: 0,
    trainingPrograms: 0,
    reviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user?.brandId) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      if (!user?.brandId) {
        setStats({
          products: 0,
          providers: 0,
          trainingPrograms: 0,
          reviews: 0,
        });
        return;
      }
      
      // Fetch brand document with nested arrays
      const brand = await brandReadService.getBrand(user.brandId);
      
      if (brand) {
        setStats({
          products: brand.products?.length || 0,
          providers: brand.certifiedProviders?.length || 0,
          trainingPrograms: brand.trainingPrograms?.length || 0,
          reviews: brand.reviews?.length || 0,
        });
      } else {
        setStats({
          products: 0,
          providers: 0,
          trainingPrograms: 0,
          reviews: 0,
        });
      }
    } catch (error) {
      // Error fetching stats - set to 0 on error
      setStats({
        products: 0,
        providers: 0,
        trainingPrograms: 0,
        reviews: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const statCards = [
    { label: "Total Products", value: stats.products, color: "bg-blue-500" },
    { label: "Certified Providers", value: stats.providers, color: "bg-green-500" },
    { label: "Training Programs", value: stats.trainingPrograms, color: "bg-yellow-500" },
    { label: "Reviews", value: stats.reviews, color: "bg-pink-500" },
  ];
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4 opacity-10`}></div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium text-gray-900">Add New Product</div>
            <div className="text-sm text-gray-500">Create a new beauty product</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium text-gray-900">Add Provider</div>
            <div className="text-sm text-gray-500">Register a new certified provider</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium text-gray-900">View Analytics</div>
            <div className="text-sm text-gray-500">Check platform performance</div>
          </button>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        {stats.products === 0 && stats.providers === 0 && stats.reviews === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {user?.brandId 
                ? "No recent activity. Add products or providers to see activity."
                : "No brand associated with your account. Please contact support."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* In a real implementation, this would show actual recent items from Firestore */}
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">Activity tracking coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}