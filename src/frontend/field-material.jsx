import { FieldClass } from "./FieldClass";
import Text from "./fields/material/text";
import Boolean from "./fields/boolean";
// import "./fields/input.css";

import Checkbox from "./fields/checkbox";
import Radio from "./fields/radio";
import AutoComplete from "./fields/material/autocomplete";
import SelectMaterial from "./fields/material/select";

const FieldMaterial = ({ field, onFieldChange, ConditionallyBound }) => {
  const FieldObj = new FieldClass(field, ConditionallyBound);
  // FieldObj.input_attributes();
  switch (field.input_type) {
    case "email":
    case "number":
    case "url":
    case "text":
      return (
        <Text field={field} FieldObj={FieldObj} onFieldChange={onFieldChange} />
      );
    case "switch":
      return (
        <Boolean
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );
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
        <Checkbox
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );

    case "radio":
      return (
        <Radio
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
