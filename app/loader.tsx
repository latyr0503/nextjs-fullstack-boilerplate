import React from "react";

export default function loader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-sky-600"></div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-sky-600"></div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-sky-600"></div>
    </div>
  );
}
