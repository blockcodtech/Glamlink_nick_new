"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TrainingRedirectPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/profile/brand/training");
  }, [router]);
  
  return (
    <div className="p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to training...</p>
      </div>
    </div>
  );
}