"use client";

import { useRouter } from "next/navigation";
import { BackToListButtonProps } from "../../types/shared";

export default function BackToListButton({ label = "Back to List" }: BackToListButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-sm text-gray-600 hover:text-glamlink-teal transition-colors mb-6"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {label}
    </button>
  );
}