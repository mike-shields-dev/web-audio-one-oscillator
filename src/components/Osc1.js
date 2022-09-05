import React from "react";
import RangeInput from "./RangeInput";
import SelectInput from "./SelectInput";

export default function Osc1({ changeParam, params }) {
  return (
    <div className="control">
      <h2 className="control-label">Osc 1</h2>
      {Object.entries(params).map(([paramName, paramSettings]) => {
        
        const Input =
          paramSettings.inputType === "range"
            ? RangeInput
            : "radio"
            ? SelectInput
            : null;

        return (
          <div className="param" key={`Osc1_${paramName}`}>
            <h3 className="param-label">{paramName}</h3>
            <Input
              paramName={paramName}
              paramSettings={paramSettings}
              handleChange={changeParam}
            />
          </div>
        );
      })}
    </div>
  );
}
