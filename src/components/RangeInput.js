import React from "react";

export default function Slider({ paramName, paramSettings, handleChange }) {
  return (
    <input
      type="range"
      name={paramName}
      id={`${paramName}`}
      min={paramSettings.min}
      max={paramSettings.max}
      onChange={handleChange}
      value={paramSettings.value}
      step={paramSettings.step}
    />
  );
}
