import { useState, useEffect } from "react";
import "./Render.css";
import useLocalStorage from "../common/useLocalStorage";
import Field from "./field";

function Render() {
  const [Fields, setFields] = useLocalStorage("wcmore_fields", []);

  const handleFieldChange = (e, setting) => {
    console.log(e, setting);
  };

  return (
    <div className="wcforce-extra-fields-wrapper">
      {Fields.map((field) => (
        <div
          key={field._id}
          className={`wcforce-field-wrapper ${field.type} ${field.field_id}`}
        >
          <Field field={field} onFieldChange={handleFieldChange} />
        </div>
      ))}
    </div>
  );
}

export default Render;
