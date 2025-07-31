"use client";

import React, { useState } from 'react';
import { useAppSelector } from "@/store/hooks";
import IdeasResearchTab from './IdeasResearchTab';

export default function BrainstormTab() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user?.brandId || user.email === 'admin@glamlink.net') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Brainstorming is not available for this account type.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Brainstorm & Research</h2>
        <p className="mt-1 text-sm text-gray-600">
          Generate ideas and research topics to grow your beauty brand
        </p>
      </div>

      {/* Content */}
      <IdeasResearchTab />
    </div>
  );
}