import React from "react";
import { ProductTabsProps } from "../../types/components";
import { getTabClass } from "../core/ui";

export default function ProductTabs({ props }: { props: ProductTabsProps }) {
  if (!props) {
    return null;
  }
  const { state, handlers } = props;
  const { activeTab, tabs } = state;
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handlers?.onTabChange(tab.id)}
              className={getTabClass(activeTab === tab.id)}
            >
              {tab.label}
              {tab.badgeCount && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {tab.badgeCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}