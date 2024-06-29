import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex justify-between items-center p-4 my-2 border rounded-lg bg-white animate-pulse">
      <div className="flex-1 mr-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default SkeletonCard;
