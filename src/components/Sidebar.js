import React from 'react';

const Sidebar = ({ onAdd }) => {
  return (
    <div className="w-64 bg-blue-500 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Components</h2>
      <div
        className="bg-white text-black p-4 mb-4 rounded cursor-pointer hover:bg-gray-200"
        onClick={() => onAdd('Workout Plan')}
      >
        Workout Plan
      </div>
      <div
        className="bg-white text-black p-4 mb-4 rounded cursor-pointer hover:bg-gray-200"
        onClick={() => onAdd('Meal Plan')}
      >
        Meal Plan
      </div>
      <div
        className="bg-white text-black p-4 mb-4 rounded cursor-pointer hover:bg-gray-200"
        onClick={() => onAdd('Client Progress')}
      >
        Client Progress
      </div>
      <div className="bg-gray-200 h-4 mt-4 rounded-md"></div> {/* Rectangle bar */}
    </div>
  );
};

export default Sidebar;
