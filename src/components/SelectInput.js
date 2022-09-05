import React from "react";

export default function RadioInput({ paramName, paramSettings, handleChange }) {
  return (
    <select name={paramName} onChange={handleChange} value={paramSettings.value}>
      {paramSettings.choices.map((choice) => (
        <option
          key={`${paramName}-${choice}`}
          value={choice}
        >
          {choice}
        </option>
      ))}
    </select>
  );
}
