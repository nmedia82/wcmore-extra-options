import { FieldClass } from "./FieldClass";
import Text from "./fields/material/text";
import RadioMaterial from "./fields/material/radio";
// import "./fields/input.css";

import CheckboxMaterial from "./fields/material/checkbox";
import Radio from "./fields/radio";
import AutoComplete from "./fields/material/autocomplete";
import SelectMaterial from "./fields/material/select";

const FieldMaterial = ({ field, onFieldChange, ConditionallyBound }) => {
  const FieldObj = new FieldClass(field, ConditionallyBound);
  // FieldObj.input_attributes();
  switch (field.input) {
    case "email":
    case "number":
    case "url":
    case "text":
      return (
        <Text field={field} FieldObj={FieldObj} onFieldChange={onFieldChange} />
      );
    case "switch":
      return <div></div>;
    case "select":
      return (
        <SelectMaterial
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );
    case "checkbox":
      return (
        <CheckboxMaterial
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );

    case "radio":
      return (
        <RadioMaterial
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );

    case "autocomplete":
      return (
        <AutoComplete
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );

    default:
      return "";
  }
};

export default FieldMaterial;
