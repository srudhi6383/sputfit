import React from 'react';

const RectangleBarComponent = ({ data }) => {
  // Example: Implement your rectangle bar rendering logic here based on 'data'
  return (
    <div className="rectangle-bar-content">
      {/* Example: Render your actual rectangle bar here */}
      <h3>Rectangle Bar Component</h3>
      {/* Replace with actual rectangle bar rendering logic */}
      <div className="rectangle-bar">
        {data.map((item, index) => (
          <div key={index} className="bar" style={{ width: item.width, height: item.height }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RectangleBarComponent;
